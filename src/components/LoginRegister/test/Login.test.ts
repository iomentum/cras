import { mount } from '@vue/test-utils'
import Login from '@/components/LoginRegister/Login.vue'
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing'
import { createApp } from 'vue';
import router from '@/router/index';

const wrapper = mount(Login,{
  global: {
    plugins: [createTestingPinia(), router],
  }
});

describe('Login unit test', () => {
  const app = createApp({})
  beforeEach(() => {
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
  });


  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
});