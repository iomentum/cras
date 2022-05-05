import { mount } from '@vue/test-utils'
import { WorkedDay, Holiday, Day } from '@/models/day'
import SingleDay from '@/components/SingleDay.vue'
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing'
import { createApp } from 'vue';
import router from '@/router/index';

describe('SingleDay unit test', () => {
  const app = createApp({})
  beforeEach(() => {
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
  });

  const holiday = new Holiday(new Date(2022,4,5))
  const workedDay = new WorkedDay(new Date(2022,4,5))
  const wrapper = mount(SingleDay,{
    props: {
      day: workedDay
    },
    global: {
      plugins: [createTestingPinia(), router],
    },
  });

  test('is comp exist', () => {
    expect(wrapper.exists()).toBe(true)
  });

  test('is prop day type is "Day" ?',() => {
    expect(wrapper.props().day).toBeInstanceOf(Day)
  });

  test('is holiday class exist ?',() => {
    expect(wrapper.find(".holiday").exists()).toBe(false)
  });

  test('is prop day type is "WorkedDay" ?',() => {
    expect(wrapper.props().day).toBeInstanceOf(WorkedDay);
  });

  test('is holiday class exist ?', async () => {
    await wrapper.setProps({ day: holiday })
    expect(wrapper.find(".holiday").exists()).toBe(true)
  });

  test('is prop day type is "Holiday" ?',() => {
    expect(wrapper.props().day).toBeInstanceOf(Holiday);
  });
});
