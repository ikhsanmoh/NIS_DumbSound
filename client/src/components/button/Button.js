const Button = ({ text, onClick, className }) => {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  )
}

Button.defaultProps = {
  className: 'btn',
  text: 'Button',
  onClick: () => { alert('Button Click') }
}

export default Button
