import { act, fireEvent, render } from '@/jest/test-utils'
import { Header } from '@/ui/screens/authentication/login/header'
import React from 'react'
const mockGoBack = jest.fn()

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native')
  return {
    ...actualNav,
    useNavigation: () => ({
      goBack: mockGoBack,
    }),
  }
})
describe('<Header />', () => {
  it('should navigate to prev screen if user press button go back', async () => {
    const { getByTestId } = render(<Header />)
    const buttonGoBack = getByTestId('button-go-back')
    await act(async () => {
      fireEvent.press(buttonGoBack)
    })
    expect(mockGoBack).toHaveBeenCalled()
  })
  describe('accessibility', () => {
    it('should has accessibilityHint into button go back', () => {
      const { getByTestId } = render(<Header />)
      const buttonGoBack = getByTestId('button-go-back')
      expect(buttonGoBack).toHaveProp('accessibilityHint')
    })
  })
})
