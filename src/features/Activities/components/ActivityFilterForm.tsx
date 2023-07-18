import { useFormik } from 'formik'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import * as yup from 'yup'
import { ActivityFilter, ACTIVITY_TYPES } from '../structure/model'
import containerStyles from '../../../common/components/container.module.scss'

const validationSchema = yup.object({
  participants: yup
    .number()
    .positive('Number of participants must be a positive integer.')
    .integer('Number of participants must be a positive integer.')
})

interface FilterProps {
  onFilter: (filter: ActivityFilter) => void
}

const ActivityFilterForm: React.FC<FilterProps> = ({ onFilter }) => {
  const formik = useFormik<ActivityFilter>({
    initialValues: {
      type: '',
      participants: undefined,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const filter = new ActivityFilter(values.type, values.participants?.toString())
      onFilter(filter)
    },
  })

  return (
    <form className={containerStyles.filter} onReset={formik.handleReset} onSubmit={formik.handleSubmit}>
      <FormControl className={containerStyles.formControl}>
        <InputLabel>Type</InputLabel>
        <Select
          id="type"
          name="type"
          label="Type"
          value={formik.values.type}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {ACTIVITY_TYPES.map((type) => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        id="participants"
        name="participants"
        label="Participants"
        type="number"
        value={formik.values.participants ?? ''}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.participants && Boolean(formik.errors.participants)}
        helperText={formik.touched.participants && formik.errors.participants}
      />
      <div className={containerStyles.marginLeftButton}>
        <Button type='reset'>Reset</Button>
      </div>
      <div className={containerStyles.marginLeftButton}>
        <Button type="submit">Filter</Button>
      </div>
    </form>
  )
}

export default ActivityFilterForm
