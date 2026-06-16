'use client'

import {
  Card,
  Grid,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { ReservationStatusLegend } from '@/components/admin/reservation-status-legend'
import type { Reservation, ReservationStatus } from '@/lib/admin/types'
import { RESERVATION_STATUS_LABELS } from '@/lib/admin/types'

const STATUSES: ReservationStatus[] = [
  'pending',
  'confirmed',
  'seated',
  'completed',
  'cancelled',
  'no_show',
]

const TIME_SLOTS = [
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00',
]

const GUEST_OPTIONS = ['1', '2', '3', '4', '5', '6', '7', '8+']

type Props = {
  value: Reservation
  onChange: (value: Reservation) => void
}

export function ReservationForm({ value, onChange }: Props) {
  function patch(partial: Partial<Reservation>) {
    onChange({ ...value, ...partial })
  }

  return (
    <Grid gutter="lg">
      <Grid.Col span={{ base: 12, lg: 6 }}>
        <Card padding="lg" radius="lg" withBorder shadow="sm" h="100%">
          <Title order={3} c="navy.5" mb={4}>
            Datum & tijd
          </Title>
          <Text size="sm" c="dimmed" mb="lg">
            Wanneer komt de gast eten en met hoeveel personen?
          </Text>
          <Stack gap="md">
            <Grid>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <TextInput
                  label="Datum"
                  description="De dag waarop de tafel is gereserveerd"
                  type="date"
                  required
                  value={value.date}
                  onChange={(e) => patch({ date: e.currentTarget.value })}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Select
                  label="Tijd"
                  description="Aankomsttijd van de gasten"
                  data={TIME_SLOTS}
                  value={value.time}
                  onChange={(t) => t && patch({ time: t })}
                  placeholder="Kies een tijd"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Select
                  label="Aantal gasten"
                  description="Inclusief kinderen"
                  data={GUEST_OPTIONS}
                  value={value.guests}
                  onChange={(g) => g && patch({ guests: g })}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, sm: 6 }}>
                <Select
                  label="Status"
                  description="Waar staat deze reservering in het proces?"
                  data={STATUSES.map((s) => ({
                    value: s,
                    label: RESERVATION_STATUS_LABELS[s],
                  }))}
                  value={value.status}
                  onChange={(s) => s && patch({ status: s as ReservationStatus })}
                />
              </Grid.Col>
            </Grid>
            <ReservationStatusLegend />
            <Textarea
              label="Opmerkingen"
              description="Allergieën, kinderstoel, verjaardag — alles wat het team moet weten"
              rows={4}
              value={value.notes}
              onChange={(e) => patch({ notes: e.currentTarget.value })}
              placeholder="Bijv. vegetarisch menu, raamplaats gewenst…"
            />
          </Stack>
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, lg: 6 }}>
        <Card padding="lg" radius="lg" withBorder shadow="sm" h="100%">
          <Title order={3} c="navy.5" mb={4}>
            Contactgegevens gast
          </Title>
          <Text size="sm" c="dimmed" mb="lg">
            Zo kunt u de gast bereiken bij wijzigingen of vragen
          </Text>
          <Stack gap="md">
            <TextInput
              label="Naam"
              description="Voor- en achternaam van de contactpersoon"
              required
              value={value.name}
              onChange={(e) => patch({ name: e.currentTarget.value })}
              placeholder="Bijv. Jan de Vries"
            />
            <TextInput
              label="E-mail"
              description="Optioneel — handig voor bevestigingsmails"
              type="email"
              value={value.email}
              onChange={(e) => patch({ email: e.currentTarget.value })}
              placeholder="naam@voorbeeld.nl"
            />
            <TextInput
              label="Telefoon"
              description="Aanbevolen voor telefonische reserveringen"
              type="tel"
              value={value.phone}
              onChange={(e) => patch({ phone: e.currentTarget.value })}
              placeholder="+31 6 13449728"
            />
            {value.id ? (
              <Text size="xs" c="dimmed" pt="xs">
                Reserveringsnummer: {value.id}
                {value.createdAt ? (
                  <>
                    {' '}
                    · Aangemaakt{' '}
                    {new Date(value.createdAt).toLocaleString('nl-NL', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })}
                  </>
                ) : null}
              </Text>
            ) : null}
          </Stack>
        </Card>
      </Grid.Col>
    </Grid>
  )
}
