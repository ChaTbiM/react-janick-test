import { ComponentProps, FC } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  theme: 'primary' | 'secondary'
  text: string
}

const Button: FC<ButtonProps> = ({ theme, text, ...restOfProps }) => {
  const defaultClasses = 'mt-4 px-1.5 py-1 text-white text-center capitalize'
  const classesForPrimary = 'bg-blue-500'
  const classesForSecondary = 'bg-red-500'
  return (
    <button
      type="button"
      {...restOfProps}
      className={`${defaultClasses} ${
        theme === 'primary' ? classesForPrimary : classesForSecondary
      }`}
    >
      {text}
    </button>
  )
}

export default Button
