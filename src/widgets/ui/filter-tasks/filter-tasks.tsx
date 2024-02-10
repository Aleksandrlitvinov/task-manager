import { Button } from '@/components'
import { FilterTasksType } from '@/widgets/ui/task-list/taskList'

const buttons = [{ title: 'All' }, { title: 'Active' }, { title: 'Completed' }]

type FilterPropsType = {
  filter: FilterTasksType
  onClickSetFilter: (value: string) => void
}

export const FilterTasks = (props: FilterPropsType) => {
  const { onClickSetFilter } = props

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px' }}>
      {buttons.map(b => (
        <Button key={b.title} onClick={() => onClickSetFilter(b.title)} variant={'success'}>
          {b.title}
        </Button>
      ))}
    </div>
  )
}
