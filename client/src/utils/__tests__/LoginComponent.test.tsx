import { fireEvent, render, screen } from '@testing-library/react'
import LoginForm from '@/features/auth/components/LoginForm'
import { describe, expect, it } from 'vitest'

describe('Test login compoennt', async () => {
  it('should render the login form', () => {
    render(<LoginForm />)
    expect(screen.getByText('Tên đăng nhập')).toBeDefined()
  })

  it('Input field should have label', () => {
    render(<LoginForm />)
    expect(screen.getByLabelText('Tên đăng nhập').getAttribute('id')).toBe('username')
    expect(screen.getByLabelText('Mật khẩu').getAttribute('id')).toBe('password')
  })

  it('input field should change value', () => {
    render(<LoginForm />)
    const userNameNode = screen.getByLabelText('Tên đăng nhập')
    fireEvent.change(userNameNode, {
      target: {
        value: 'testing',
      },
    })
    expect(userNameNode.getAttribute('value')).toMatch('testing')
  })
})
