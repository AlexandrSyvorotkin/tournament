import { z } from 'zod'
import type { TournamentMode } from './tournaments'

const rosterSize: Record<TournamentMode, number> = {
  '1v1': 1,
  '2v2': 2,
  '5v5': 5,
}

export function getRosterSize(mode: TournamentMode) {
  return rosterSize[mode]
}

export function parsePlayerNames(value: string) {
  return value
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean)
}

function isContactPhone(value: string) {
  if (!/^[+\d\s()-]+$/.test(value)) return false
  const digits = value.replace(/\D/g, '')
  return (
    digits.length === 10 ||
    (digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8')))
  )
}

function rosterError(size: number) {
  if (size === 1) return 'Укажите одно имя без запятой'
  if (size === 2) return 'Укажите 2 имени участников через запятую'
  return `Укажите ${size} имён участников через запятую`
}

export function createRegistrationSchema(mode: TournamentMode, paid: boolean) {
  const size = rosterSize[mode]

  return z.object({
    teamName: z
      .string()
      .trim()
      .min(2, 'Укажите название команды')
      .max(40, 'Название команды не длиннее 40 символов'),
    players: z
      .string()
      .trim()
      .min(1, size === 1 ? 'Укажите имя участника' : 'Укажите имена участников')
      .refine(
        (value) => size !== 1 || !value.includes(','),
        'Укажите одно имя без запятой',
      )
      .refine(
        (value) => parsePlayerNames(value).length === size,
        rosterError(size),
      )
      .refine(
        (value) => parsePlayerNames(value).every((name) => name.length >= 2),
        'Имя участника должно быть не короче 2 символов',
      ),
    phone: z
      .string()
      .trim()
      .min(1, 'Укажите номер телефона для связи')
      .refine(isContactPhone, 'Укажите корректный номер телефона'),
    paid: paid
      ? z.boolean().refine((value) => value, 'Подтвердите, что участие платное')
      : z.boolean(),
  })
}

export type RegistrationFormValues = z.infer<
  ReturnType<typeof createRegistrationSchema>
>

const registrationSheetUrl =
  'https://script.google.com/macros/s/AKfycbzRke4ykVWbpN6JvZngrzOyFroPCrij61a01D-2o0OyPGI6zZZ_sUkfxrCIaw1E_gMO/exec'

export async function sendRegistration(entry: {
  tournament: string
  mode: string
  teamName: string
  players: string
  phone: string
  paid: boolean
}) {
  await fetch(registrationSheetUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(entry),
  })
}
