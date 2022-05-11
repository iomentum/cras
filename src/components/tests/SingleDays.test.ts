import { mount } from '@vue/test-utils'
import { WorkedDay, Holiday, Day } from '@/models/day'
import SingleDay from '@/components/SingleDay.vue'
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing'
import { createApp } from 'vue';
import router from '@/router/index';

const workedDay = new WorkedDay(new Date(2022,4,11))

describe('TableDays unit test', () => {
  const app = createApp({})
  beforeEach(() => {
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
  });

  const wrapper = mount(SingleDay,{
    props: {
      day: workedDay
    },
    global: {
      plugins: [createTestingPinia(), router],
    }
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
});
