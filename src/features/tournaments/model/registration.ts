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
    .split(/\n|,/)
    .map((name) => name.trim())
    .filter(Boolean)
}

function rosterError(size: number) {
  if (size === 1) return 'Укажите имя участника'
  if (size === 2) return 'Укажите 2 имени участников, каждое с новой строки'
  return `Укажите ${size} имён участников, каждое с новой строки`
}

export function createRegistrationSchema(mode: TournamentMode) {
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
      .min(1, 'Укажите имена участников')
      .refine(
        (value) => parsePlayerNames(value).length === size,
        rosterError(size),
      )
      .refine(
        (value) => parsePlayerNames(value).every((name) => name.length >= 2),
        'Имя участника должно быть не короче 2 символов',
      ),
    paid: z
      .boolean()
      .refine((value) => value, 'Подтвердите, что участие платное'),
  })
}

export type RegistrationFormValues = z.infer<
  ReturnType<typeof createRegistrationSchema>
>

const registrationSheetUrl =
  'https://script.google.com/macros/s/AKfycbxR52Zs5zXImpa-ctqjs7tTSQHktXUBON3jtgpZUxYs9DC_iFn--QB3ufI9TNQp_vHK/exec'

export async function sendRegistration(entry: {
  tournament: string
  mode: string
  teamName: string
  players: string
  paid: boolean
}) {
  await fetch(registrationSheetUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(entry),
  })
}
