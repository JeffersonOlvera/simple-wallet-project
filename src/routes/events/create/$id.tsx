import React, { useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useStore } from '@tanstack/react-form'
import type { CreateEventType } from '@/types/event.type'
import { CreateEventSchema } from '@/types/event.type'

import DataRepo from '@/api/datasource'
import { useAppForm } from '@/hooks/form'
// import AnalyticReport from '@/components/form/analytic-report'
import { notifications } from '@/lib/notification'

export const Route = createFileRoute('/events/create/$id')({
  component: RouteComponent,
})

const defaultValues: CreateEventType = {
  nombre: '',
  descripccion: '',
  cantidad: 0,
  fecha: new Date(),
  tipo: 'ingreso',
}

function RouteComponent() {
  const { id } = Route.useParams()
  const navigate = useNavigate()

  const [mode] = React.useState<'create' | 'update'>(
    id === 'new' ? 'create' : 'update',
  )

  const { data } = useQuery({
    enabled: mode === 'update',
    queryKey: ['event', id],
    queryFn: () => DataRepo.getEventById(id),
  })

  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation<boolean, Error, CreateEventType>({
    mutationKey: ['event'],
    mutationFn: async (values) => {
      if (mode === 'create') {
        await DataRepo.saveEvent(values)
      } else {
        await DataRepo.updateEvent({
          ...values,
          id: id,
        })
      }
      queryClient.invalidateQueries({
        queryKey: ['events'],
      })
      return true
    },
    onSettled: (_, error) => {
      if (error) {
        notifications.error({
          title: 'Error',
          message:
            error.message || 'An error occurred while saving the candidate',
        })
      } else {
        if (mode === 'create') {
          notifications.success({
            title: 'Success',
            message: 'Candidate created successfully!',
          })
        }
        if (mode === 'update') {
          notifications.success({
            title: 'Success',
            message: 'Candidate updated successfully!',
          })
        }
        // Redirect to the events list or another page
        navigate({ to: '/events' })
      }
    },
  })

  const { mutate: deleteEvent, isPending: isDeleting } = useMutation({
    mutationFn: () => DataRepo.deleteEvent(id),
    onSettled: (_, error) => {
      if (error) {
        notifications.error({
          title: 'Error',
          message:
            error.message || 'An error occurred while deleting the event',
        })
      } else {
        notifications.success({
          title: 'Success',
          message: 'Event deleted successfully!',
        })
        navigate({ to: '/events' })
      }
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })

  const form = useAppForm({
    defaultValues,
    onSubmit: ({ value }) => {
      console.log('Form submitted with values:', value)
      mutate(value)
    },
    onSubmitInvalid: (errors) => {
      console.error('Form submission errors:', errors)
    },
    validators: {
      onSubmit: CreateEventSchema,
    },
  })

  useEffect(() => {
    if (data) {
      // setForm({
      //   name: data.name,
      //   age: data.age,
      //   experience: data.experience,
      //   status: data.status,
      //   skills: data.skills,
      //   working: data.working,
      // })
      form.reset(
        {
          nombre: data.nombre,
          descripccion: data.descripccion,
          cantidad: data.cantidad,
          fecha: data.fecha,
          tipo: data.tipo,
        },
        { keepDefaultValues: true },
      )
    }
  }, [data])

  const dataForm = useStore(form.store, (state) => state.values)

  // const onCopyCallback = React.useCallback(copyData, [dataForm.working])

  const analyticValueMemo = React.useMemo(() => {
    return {
      cantidad: dataForm.cantidad,
      fecha: dataForm.fecha,
    }
  }, [dataForm.cantidad, dataForm.fecha])

  const handleDelete = React.useCallback(() => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this event? This action cannot be undone.',
    )

    if (isConfirmed) {
      deleteEvent()
    }
  }, [deleteEvent])

  return (
    <div className="flex flex-row gap-x-4">
      <form
        className="flex flex-col gap-4 p-4 min-w-[450px]"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <h1 className="text-2xl font-bold">Form</h1>

        <form.AppField
          name="nombre"
          children={(field) => (
            <field.Input
              type="text"
              label="Nombre"
              placeholder="Ingrese su nombre"
              className="w-full"
            />
          )}
        />

        <form.AppForm>
          <form.SubmitButton
            text={
              isPending
                ? 'Saving..'
                : (mode === 'create' ? 'Create' : 'Update') + ' Candidate'
            }
            type="submit"
            className="mt-4 w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
          />
        </form.AppForm>

        {mode === 'update' && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting || isPending}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white font-semibold rounded transition-colors"
          >
            {isDeleting ? 'Deleting...' : 'Delete Candidate'}
          </button>
        )}
      </form>

      {/* <AnalyticReport data={analyticValueMemo} onCopy={onCopyCallback} /> */}
    </div>
  )

  function copyData(value: string) {
    navigator.clipboard
      .writeText(`${value} Modo: ${mode}`)
      .then(() =>
        notifications.success({
          title: 'Data copied',
          message: 'Value has been copied to clipboard',
        }),
      )
      .catch((err) => console.error('Failed to copy: ', err))
  }
}
