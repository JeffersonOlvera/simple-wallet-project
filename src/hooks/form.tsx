import {
  createFormHook,
  createFormHookContexts,
  useStore,
} from '@tanstack/react-form'
import { Input, Select, SubmitButton } from '@/components/form'

export const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts()

export const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: Input,
    Select: Select,
  },
  formComponents: {
    SubmitButton: (props) => (
      <SubmitButton {...props} className="bg-indigo-500" />
    ),
  },
  fieldContext,
  formContext,
})

export function useField() {
  try {
    const field = useFieldContext<unknown>()
    const errors = useStore(field.store, (state) => state.meta.errors)

    return {
      field,
      errors,
    }
  } catch {
    return {
      field: null,
      errors: [],
    }
  }
}
