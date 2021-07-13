import ReactLoading from 'react-loading';

const Loading = ({ type, color, size }) => (
  <ReactLoading
    type={type}
    color={color}
    width={size}
    height={size}
  />
)

Loading.defaultProps = {
  type: 'spin',
  color: '#333',
  size: '20px',
}

export default Loading