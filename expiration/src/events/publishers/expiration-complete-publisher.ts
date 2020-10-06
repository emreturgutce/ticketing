import {
  ExpirationCompleteEvent,
  Publisher,
  Subjects,
} from '@et-ticketing/common'

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  readonly subject = Subjects.ExpirationComplete
}
