import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getLivenessCheck(): string {
    return 'Liveness Check'
  }
}
