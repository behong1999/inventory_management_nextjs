type Props = {
  name: String;
};

const Header = ({ name }: Props) => {
  return <h1 className='text-2xl font-semibold text-gray-700'>{name}</h1>;
};

export default Header;
