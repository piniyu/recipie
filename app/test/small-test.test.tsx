import { describe, it } from 'vitest'
import { render, RenderOptions, screen } from '@testing-library/react'
import AuthCheck from '~/components/auth/auth-check'
import { UserContext, UserContextType } from '~/utils/domain/auth/user-context'
import { ReactNode } from 'react'
import { fireEvent } from '@testing-library/dom'
import '@testing-library/jest-dom'
import routeData from 'react-router'
import { BrowserRouter } from 'react-router-dom'

const customRender = (
  ui: ReactNode,
  {
    providerProps,
    ...renderOptions
  }: {
    providerProps: { value: UserContextType }
    renderOptions?: Omit<RenderOptions, 'wrapper'>
  },
) => {
  return render(
    <BrowserRouter>
      <UserContext.Provider {...providerProps}>{ui}</UserContext.Provider>
    </BrowserRouter>,
    renderOptions.renderOptions,
  )
}

describe('Auth-check component', () => {
  const useLocation = vi.spyOn(routeData, 'useLocation')
  beforeEach(() => {
    useLocation.mockReturnValue({ pathname: '/' } as any)
    document.body.innerHTML = `
        <div id="modal-container"></div>
        `
  })
  it('should show login modal', () => {
    const providerProps = {
      value: null,
    }
    const { getByText } = customRender(
      <AuthCheck loginConfirmModal>
        {user => (
          <button>
            click:{`{userId: ${user?.id}, userEmail: ${user?.email} }`}
          </button>
        )}
      </AuthCheck>,
      { providerProps },
    )

    fireEvent.click(getByText(/^click/))

    expect(screen.getByText('Login')).toBeInTheDocument()
  })
})
