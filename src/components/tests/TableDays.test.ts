import { mount } from '@vue/test-utils'
import { WorkedDay, Holiday, Day } from '@/models/day'
import TableDays from '@/components/TableDays.vue'
import { setActivePinia, createPinia } from 'pinia';
import { createTestingPinia } from '@pinia/testing'
import { createApp } from 'vue';
import router from '@/router/index';

const arrayOfDays = [
  new Holiday(new Date(2022,4,1)),
  new WorkedDay(new Date(2022,4,2)),
  new WorkedDay(new Date(2022,4,3)),
  new WorkedDay(new Date(2022,4,4)),
  new WorkedDay(new Date(2022,4,5)),
  new WorkedDay(new Date(2022,4,6)),
  new Holiday(new Date(2022,4,7)),
  new Holiday(new Date(2022,4,8)),
  new WorkedDay(new Date(2022,4,9)),
  new WorkedDay(new Date(2022,4,10)),
  new WorkedDay(new Date(2022,4,11)),
  new WorkedDay(new Date(2022,4,12)),
  new WorkedDay(new Date(2022,4,13)),
  new Holiday(new Date(2022,4,14)),
  new Holiday(new Date(2022,4,15)),
  new WorkedDay(new Date(2022,4,16)),
  new WorkedDay(new Date(2022,4,17)),
  new WorkedDay(new Date(2022,4,18)),
  new WorkedDay(new Date(2022,4,19)),
  new WorkedDay(new Date(2022,4,20)),
  new Holiday(new Date(2022,4,21)),
  new Holiday(new Date(2022,4,22)),
  new WorkedDay(new Date(2022,4,23)),
  new WorkedDay(new Date(2022,4,24)),
  new WorkedDay(new Date(2022,4,25)),
  new Holiday(new Date(2022,4,26)),
  new WorkedDay(new Date(2022,4,27)),
  new Holiday(new Date(2022,4,28)),
  new Holiday(new Date(2022,4,29)),
  new WorkedDay(new Date(2022,4,30)),
  new WorkedDay(new Date(2022,4,31)),
];

describe('TableDays unit test', () => {
  const app = createApp({})
  beforeEach(() => {
    const pinia = createPinia()
    app.use(pinia)
    setActivePinia(pinia)
  });

  const wrapper = mount(TableDays,{
    props: {
      daysList: arrayOfDays
    },
    global: {
      plugins: [createTestingPinia(), router],
    }
  });

  it('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
});
