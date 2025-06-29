<template>
  <div class="waffle-system">
    <div class="container">
      <header>
        <h1><i class="fas fa-gift"></i> 幸运抽奖系统</h1>
        <p>基于Vue3和TypeScript开发的抽奖系统，支持导入用户名单并随机抽取获奖者</p>
      </header>
      
      <div class="app-container">
        <!-- 左侧控制面板 -->
        <div class="card">
          <div class="tech-badge">参与者管理</div>
          <h2><i class="fas fa-cog"></i> 抽奖设置</h2>
          
          <div class="form-group">
            <label for="participants"><i class="fas fa-users"></i> 导入参与者名单</label>
            <div class="file-upload" @click="triggerFileInput">
              <i class="fas fa-cloud-upload-alt"></i>
              <p>点击或拖拽文件到此处上传</p>
              <p>支持.txt或.csv格式 (每行一个名字)</p>
              <p v-if="fileName" class="file-name">{{ fileName }}</p>
              <p v-else class="file-name">未选择文件</p>
            </div>
            <input 
              type="file" 
              id="fileInput" 
              ref="fileInput"
              style="display: none" 
              accept=".txt,.csv"
              @change="handleFileUpload"
            >
          </div>
          
          <div class="form-group">
            <label for="winnersCount"><i class="fas fa-trophy"></i> 获奖人数</label>
            <input 
              type="number" 
              id="winnersCount" 
              v-model.number="winnersCount" 
              min="1" 
              :max="participants.length"
              placeholder="输入要抽取的获奖人数"
            >
          </div>
          
          <div class="form-group">
            <label for="exclude"><i class="fas fa-user-slash"></i> 排除已获奖者</label>
            <select id="exclude" v-model="excludeWinners">
              <option value="true">是</option>
              <option value="false">否</option>
            </select>
          </div>
          
          <div class="action-buttons">
            <button 
              class="btn" 
              :disabled="!canDraw"
              @click="drawWinners"
            >
              <i class="fas fa-star"></i> {{ drawing ? '抽取中...' : '开始抽奖' }}
            </button>
            <button 
              class="btn btn-reset" 
              @click="resetSystem"
            >
              <i class="fas fa-redo"></i> 重置系统
            </button>
          </div>
          
          <div v-if="participants.length > 0">
            <h3><i class="fas fa-list"></i> 参与者名单 ({{ participants.length }}人)</h3>
            <div class="participants-list">
              <div v-for="(participant, index) in participants" :key="index" class="participant-item">
                <i class="fas fa-user"></i> {{ participant }}
              </div>
            </div>
          </div>
          <div v-else class="empty-state">
            <i class="fas fa-user-friends"></i>
            <p>暂无参与者名单，请上传文件</p>
          </div>
        </div>
        
        <!-- 右侧结果面板 -->
        <div class="card">
          <div class="tech-badge">抽奖结果</div>
          <h2><i class="fas fa-award"></i> 抽奖结果</h2>
          
          <div class="result-container">
            <div v-if="drawing" class="spinner"></div>
            
            <div v-else-if="winners.length > 0">
              <div class="winner-card">
                <h3>恭喜获奖者!</h3>
                <p>第 {{ history.length }} 次抽奖结果</p>
                <div class="winner-name">{{ currentWinner }}</div>
                <p>共抽取 {{ winnersCount }} 名获奖者</p>
              </div>
              
              <div v-if="winners.length > 1">
                <h3>所有获奖者</h3>
                <div class="participants-list">
                  <div v-for="(winner, index) in winners" :key="index" class="participant-item">
                    <i class="fas fa-crown" style="color: gold;"></i> {{ winner }}
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else class="empty-state">
              <i class="fas fa-trophy"></i>
              <p>暂无抽奖结果</p>
              <p>请先上传名单并开始抽奖</p>
            </div>
            
            <div class="stats">
              <div class="stat-item">
                <div class="stat-value">{{ participants.length }}</div>
                <div class="stat-label">参与者</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ history.length }}</div>
                <div class="stat-label">抽奖次数</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ uniqueWinners.length }}</div>
                <div class="stat-label">获奖者</div>
              </div>
            </div>
          </div>
          
          <div v-if="history.length > 0" class="history-section">
            <h3><i class="fas fa-history"></i> 抽奖历史记录</h3>
            <div class="participants-list">
              <div v-for="(record, index) in history" :key="index" class="history-item">
                <div class="history-name">{{ record.winner }}</div>
                <div class="history-time">{{ record.time }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="tech-stack">
        <div class="tech-item"><i class="fab fa-vuejs"></i> Vue 3</div>
        <div class="tech-item"><i class="fab fa-js"></i> TypeScript</div>
        <div class="tech-item"><i class="fab fa-node-js"></i> Node 24.0</div>
        <div class="tech-item"><i class="fas fa-cube"></i> npm 10.0</div>
      </div>
      
      <div class="footer">
        <p>Waffle抽奖系统 v1.0 © 2023</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';

export default defineComponent({
  name: 'WaffleSystem',
  setup() {
    // 参与者名单
    const participants = ref<string[]>([]);
    // 文件名
    const fileName = ref('');
    // 获奖人数
    const winnersCount = ref(1);
    // 是否排除已获奖者
    const excludeWinners = ref(true);
    // 获奖者列表
    const winners = ref<string[]>([]);
    // 当前展示的获奖者
    const currentWinner = ref('');
    // 抽奖历史记录
    const history = ref<{winner: string; time: string}[]>([]);
    // 是否正在抽奖
    const drawing = ref(false);
    // 文件输入引用
    const fileInput = ref<HTMLInputElement | null>(null);
    
    // 唯一获奖者列表
    const uniqueWinners = computed(() => {
      return [...new Set(history.value.map(record => record.winner))];
    });
    
    // 是否可以开始抽奖
    const canDraw = computed(() => {
      return participants.value.length > 0 && 
             winnersCount.value > 0 &&
             winnersCount.value <= participants.value.length &&
             !drawing.value;
    });
    
    // 触发文件选择
    const triggerFileInput = () => {
      if (fileInput.value) {
        fileInput.value.click();
      }
    };
    
    // 处理文件上传
    const handleFileUpload = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (!input.files || input.files.length === 0) return;
      
      const file = input.files[0];
      fileName.value = file.name;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === 'string') {
          // 处理文本内容为数组
          participants.value = content.split('\n')
            .map(name => name.trim())
            .filter(name => name.length > 0);
        }
      };
      reader.readAsText(file);
    };
    
    // 抽奖函数
    const drawWinners = () => {
      if (!canDraw.value) return;
      
      drawing.value = true;
      winners.value = [];
      
      // 创建抽奖池（排除已获奖者）
      let pool = [...participants.value];
      if (excludeWinners.value) {
        pool = pool.filter(name => !uniqueWinners.value.includes(name));
      }
      
      // 如果抽奖池人数不足
      if (pool.length < winnersCount.value) {
        alert('抽奖池人数不足！请调整设置或重置历史记录');
        drawing.value = false;
        return;
      }
      
      // 抽奖动画效果
      let counter = 0;
      const maxIterations = 30;
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * pool.length);
        currentWinner.value = pool[randomIndex];
        counter++;
        
        if (counter >= maxIterations) {
          clearInterval(interval);
          
          // 抽取实际获奖者
          const selectedWinners: string[] = [];
          const tempPool = [...pool]; // 创建副本避免修改原数组
          for (let i = 0; i < winnersCount.value; i++) {
            if (tempPool.length === 0) break;
            const winnerIndex = Math.floor(Math.random() * tempPool.length);
            selectedWinners.push(tempPool[winnerIndex]);
            tempPool.splice(winnerIndex, 1); // 从池中移除
          }
          
          winners.value = selectedWinners;
          currentWinner.value = selectedWinners[0];
          
          // 保存到历史记录
          const now = new Date();
          const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
          
          selectedWinners.forEach(winner => {
            history.value.unshift({
              winner,
              time: timeString
            });
          });
          
          drawing.value = false;
          createConfetti();
        }
      }, 100);
    };
    
    // 创建彩色纸屑效果
    const createConfetti = () => {
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
      const container = document.querySelector('.waffle-system') as HTMLElement;
      
      if (!container) return;
      
      for (let i = 0; i < 150; i++) {
        setTimeout(() => {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';
          confetti.style.left = `${Math.random() * 100}%`;
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.width = `${Math.random() * 10 + 5}px`;
          confetti.style.height = confetti.style.width;
          confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
          
          container.appendChild(confetti);
          
          // 动画结束后移除元素
          setTimeout(() => {
            confetti.remove();
          }, 5000);
        }, i * 10);
      }
    };
    
    // 重置系统
    const resetSystem = () => {
      if (confirm('确定要重置系统吗？所有数据将被清除。')) {
        participants.value = [];
        fileName.value = '';
        winnersCount.value = 1;
        winners.value = [];
        currentWinner.value = '';
        history.value = [];
        if (fileInput.value) {
          fileInput.value.value = '';
        }
      }
    };
    
    // 初始化示例数据
    onMounted(() => {
      participants.value = [
        '张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十',
        '郑十一', '王十二', '刘十三', '陈十四', '杨十五', '黄十六', '赵十七',
        '周十八', '吴十九', '郑二十', '孙二十一', '钱二十二'
      ];
    });
    
    return {
      participants,
      fileName,
      winnersCount,
      excludeWinners,
      winners,
      currentWinner,
      history,
      drawing,
      fileInput,
      uniqueWinners,
      canDraw,
      triggerFileInput,
      handleFileUpload,
      drawWinners,
      resetSystem
    };
  }
});
</script>

<style lang="less" scoped>
@import url("container.less");
</style>