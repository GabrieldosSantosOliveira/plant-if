import { Technician } from '@/app/entities/technician'

import { makeTechnician } from '../factories/make-technician'

describe('Technician', () => {
  it('should be able create Technician', () => {
    expect(makeTechnician()).toBeInstanceOf(Technician)
  })
})
