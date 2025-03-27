import './footer.css'
import logo from '../../assets/5.png'

const footer = () => {
  return (
    <>
      <div className='footers'>
        <img src={logo} alt="logo" />
        <h3> &copy; 2025 ESCURATOR</h3>
        <h3> Terms and conditon </h3>
      </div>  
    </>
  )
}

export default footer

{/* <div className='paragh'>
<h3> &copy; 2024 ESCURATOR</h3>
<h3> Terms and conditon </h3>
</div> */}