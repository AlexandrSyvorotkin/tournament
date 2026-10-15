import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { cn } from '@/shared/lib/utils'
import {
  createRegistrationSchema,
  getRosterSize,
  sendRegistration,
  type RegistrationFormValues,
} from '@/features/tournaments/model/registration'
import type { Tournament } from '@/features/tournaments/model/tournaments'

export function RegistrationDialog({
  open,
  tournament,
  onOpenChange,
  onRegistered,
}: {
  open: boolean
  tournament: Tournament
  onOpenChange: (open: boolean) => void
  onRegistered: () => void
}) {
  const schema = useMemo(
    () => createRegistrationSchema(tournament.mode),
    [tournament.mode],
  )
  const rosterSize = getRosterSize(tournament.mode)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      teamName: '',
      players: '',
      paid: false,
    },
  })

  useEffect(() => {
    if (open) {
      reset()
      setSubmitError(null)
    }
  }, [open, reset])

  async function submitRegistration(values: RegistrationFormValues) {
    try {
      await sendRegistration({
        tournament: tournament.name,
        mode: tournament.mode,
        teamName: values.teamName,
        players: values.players,
        paid: values.paid,
      })
      onRegistered()
      onOpenChange(false)
    } catch {
      setSubmitError('Не удалось отправить заявку. Попробуйте ещё раз.')
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-40 bg-black/70" />
        <Dialog.Popup className="fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,440px)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-[#171a22] p-5 text-white shadow-2xl outline-none">
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-lg font-semibold">
                Регистрация
              </Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-zinc-400">
                {tournament.name} · {tournament.mode}
              </Dialog.Description>
            </div>
            <Dialog.Close
              aria-label="Закрыть"
              className="grid size-8 place-items-center rounded-md text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="size-4" />
            </Dialog.Close>
          </div>

          <form
            className="mt-5 flex flex-col gap-4"
            noValidate
            onSubmit={handleSubmit(submitRegistration)}
          >
            <Field
              label="Название команды"
              error={errors.teamName?.message}
              htmlFor="registration-team"
            >
              <input
                id="registration-team"
                type="text"
                autoComplete="off"
                placeholder="Например, Night Shift"
                aria-invalid={errors.teamName ? true : undefined}
                className={cn(inputClassName(Boolean(errors.teamName)), 'h-11')}
                {...register('teamName')}
              />
            </Field>

            <Field
              label="Имена участников"
              hint={rosterHint(rosterSize)}
              error={errors.players?.message}
              htmlFor="registration-players"
            >
              <textarea
                id="registration-players"
                rows={Math.max(rosterSize, 2)}
                autoComplete="off"
                placeholder={rosterPlaceholder(rosterSize)}
                aria-invalid={errors.players ? true : undefined}
                className={cn(
                  inputClassName(Boolean(errors.players)),
                  'resize-none py-2.5',
                )}
                {...register('players')}
              />
            </Field>

            <div>
              <label className="flex items-start gap-3 text-sm">
                <input
                  type="checkbox"
                  className="mt-0.5 size-4 accent-[#e24a1b]"
                  aria-invalid={errors.paid ? true : undefined}
                  {...register('paid')}
                />
                <span>Подтверждаю, что участие платное</span>
              </label>
              {errors.paid ? (
                <p className="mt-1 text-xs text-red-400">{errors.paid.message}</p>
              ) : null}
            </div>

            {submitError ? (
              <p className="text-xs text-red-400">{submitError}</p>
            ) : null}

            <div className="mt-1 flex gap-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-11 flex-1 rounded-lg bg-[#e24a1b] text-sm font-semibold transition-colors hover:bg-[#f25a28] disabled:opacity-60"
              >
                Отправить заявку
              </button>
              <Dialog.Close className="h-11 rounded-lg bg-[#3a3f4b] px-4 text-sm font-medium text-zinc-100 transition-colors hover:bg-[#4a5060]">
                Отмена
              </Dialog.Close>
            </div>
          </form>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string
  hint?: string
  error?: string
  htmlFor: string
  children: ReactNode
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="text-sm text-zinc-300">
        {label}
      </label>
      {hint ? <p className="mt-0.5 text-xs text-zinc-500">{hint}</p> : null}
      <div className="mt-1.5">{children}</div>
      {error ? <p className="mt-1 text-xs text-red-400">{error}</p> : null}
    </div>
  )
}

function inputClassName(invalid: boolean) {
  return cn(
    'w-full rounded-lg bg-[#0c0e13] px-3 text-sm outline-none ring-1 ring-white/10 focus:ring-[#e24a1b]',
    invalid && 'ring-red-400/70',
  )
}

function rosterHint(size: number) {
  if (size === 1) return 'Одно имя'
  if (size === 2) return 'Два имени, каждое с новой строки'
  return 'Пять имён, каждое с новой строки'
}

function rosterPlaceholder(size: number) {
  return Array.from({ length: size }, (_, index) => `Участник ${index + 1}`).join(
    '\n',
  )
}
