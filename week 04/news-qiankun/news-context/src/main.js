import './public-path';
import EventBus from './EventBus';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

let instance = null;
function render(props = {}) {
  const { container } = props;
  instance = new Vue({
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#context-app') : '#context-app');
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log('[context app] bootstraped');
}
export async function mount(props) {
  console.log('[context app] props from main framework', props);
  props.onGlobalStateChange((state) => {
    EventBus.commit('changePath', state.path)
  });

  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
}