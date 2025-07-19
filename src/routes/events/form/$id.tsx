import React, { useEffect } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useStore } from '@tanstack/react-form'
import type { CreateEventType } from '@/types/event.type'
import { CreateEventSchema } from '@/types/event.type'

import DataRepo from '@/api/datasource'
import { useAppForm } from '@/hooks/form'
import { notifications } from '@/lib/notification'
import { EventsCardBody } from '@/components/events'

export const Route = createFileRoute('/events/form/$id')({
  component: RouteComponent,
})

const defaultValues: CreateEventType = {
  nombre: '',
  descripccion: '',
  cantidad: 0,
  //prueba
  fecha: new Date().toISOString().split('T')[0] as unknown as Date,
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
    refetchOnMount: true,
    refetchOnWindowFocus: true,
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
      return true
    },
    onSuccess: async () => {
      // noti
      if (mode === 'create') {
        notifications.success({
          title: 'Success',
          message: 'Evento creado exitosamente!',
        })
      }
      if (mode === 'update') {
        notifications.success({
          title: 'Success',
          message: 'Evento actualizado exitosamente!',
        })
      }

      await queryClient.invalidateQueries({
        queryKey: ['events'],
      })

      await queryClient.invalidateQueries({
        queryKey: ['candidates'],
      })

      navigate({ to: '/events' })
    },
    onError: (error) => {
      notifications.error({
        title: 'Error',
        message: error.message || 'An error occurred while saving the event',
      })
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
          message: 'Evento eliminado exitosamente!',
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

  const analyticValueMemo = React.useMemo(() => {
    return {
      cantidad: dataForm.cantidad,
      fecha: dataForm.fecha,
    }
  }, [dataForm.cantidad, dataForm.fecha])

  const handleDelete = React.useCallback(() => {
    const isConfirmed = window.confirm(
      '¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer.',
    )

    if (isConfirmed) {
      deleteEvent()
    }
  }, [deleteEvent])

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors py-6 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-xl border border-gray-200 dark:border-gray-700 transition-colors">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {mode === 'create' ? 'Crear Evento' : 'Editar Evento'}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {mode === 'create'
                ? 'Complete la información para crear un nuevo evento'
                : 'Modifique la información del evento'}
            </p>
          </div>

          {/* Form */}
          <form
            className="p-6 space-y-6"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            <form.AppField
              name="nombre"
              children={(field) => (
                <field.Input
                  type="text"
                  label="Nombre del evento"
                  placeholder="Ej: Sueldo, Alquiler, Compras..."
                  className="w-full"
                />
              )}
            />

            <form.AppField
              name="descripccion"
              children={(field) => (
                <field.Input
                  type="text"
                  label="Descripción (opcional)"
                  placeholder="Descripción detallada del evento"
                  className="w-full"
                />
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form.AppField
                name="cantidad"
                children={(field) => (
                  <field.Input
                    type="number"
                    label="Cantidad"
                    placeholder="0.00"
                    className="w-full"
                    step="0.01"
                    min="0"
                  />
                )}
              />

              <form.AppField
                name="fecha"
                children={(field) => (
                  <field.Input type="date" label="Fecha" className="w-full" />
                )}
              />
            </div>

            <form.AppField
              name="tipo"
              children={(field) => (
                <field.Select
                  label="Tipo de evento"
                  options={[
                    { value: 'ingreso', label: 'Ingreso' },
                    { value: 'gasto', label: 'Gasto' },
                  ]}
                  className="w-full"
                />
              )}
            />

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <form.AppForm>
                <form.SubmitButton
                  text={
                    isPending
                      ? 'Guardando...'
                      : mode === 'create'
                        ? 'Crear Evento'
                        : 'Actualizar Evento'
                  }
                  type="submit"
                  className="flex-1 bg-purple-600 hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isPending}
                />
              </form.AppForm>

              <button
                type="button"
                onClick={() => navigate({ to: '/events' })}
                className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 rounded-lg font-medium transition-colors"
              >
                Cancelar
              </button>

              {mode === 'update' && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting || isPending}
                  className="flex-1 sm:flex-none px-6 py-3 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 disabled:bg-red-300 dark:disabled:bg-red-400 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? 'Eliminando...' : 'Eliminar'}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Vista previa del evento */}
        {(dataForm.cantidad > 0 || dataForm.fecha || dataForm.nombre) && (
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4 transition-colors">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Vista previa
            </h3>
            <EventsCardBody
              titulo={dataForm.nombre || 'Nombre del evento'}
              fecha={
                dataForm.fecha
                  ? dataForm.fecha.toString().split('-').reverse().join('/')
                  : new Date().toLocaleDateString('es-ES')
              }
              cantidad={dataForm.cantidad?.toString() || '0'}
              tipo={dataForm.tipo === 'ingreso' ? 'Ingreso' : 'Egreso'}
            />
          </div>
        )}
      </div>
    </div>
  )
}
