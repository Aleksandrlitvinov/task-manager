import { stylesBtnFilter } from '@/components'
import { FilterTasksType } from '@/redux'
import { Button, ButtonGroup, ThemeProvider } from '@mui/material'

const buttons = [{ title: 'All' }, { title: 'Active' }, { title: 'Completed' }]

type FilterPropsType = {
  className?: string
  filter: FilterTasksType
  onClickSetFilter: (value: string) => void
}

export const FilterTasks = (props: FilterPropsType) => {
  const { className, filter, onClickSetFilter } = props

  return (
    <ButtonGroup
      aria-label={'Disabled button group'}
      className={className}
      style={{ display: 'flex', justifyContent: 'space-around' }}
      variant={'outlined'}
    >
      {buttons.map(b => (
        <ThemeProvider key={b.title} theme={stylesBtnFilter}>
          <Button
            className={filter === b.title.toLowerCase() ? 'active' : 'default'}
            key={b.title}
            onClick={() => onClickSetFilter(b.title)}
          >
            {b.title}
          </Button>
        </ThemeProvider>
      ))}
    </ButtonGroup>
  )
}
