import React,{useState, useEffect} from 'react'
import background from '/background.png'
import Select from 'react-select';
import Request from '../helpers/requests'
import { useNavigate } from 'react-router-dom';

const Registerpage = () => {
  const [days] = useState(Array.from({ length: 32 }, (_, index) => index));
  const [months] = useState(['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']);
  const [years] = useState(Array.from({ length: 75 }, (_, index) => new Date().getFullYear() - index));
  const [username, setusername] = useState('');
  const [birthday, setbirthday] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [name, setname] = useState('');
  const [errors, setErrors] = useState({email: '', username: '', password: '', birthday: ''});
  const [selectedDay, setSelectedDay] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState('enero');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();
  

  const handleRegister = async () => {
    const updatedErrors = { email: '', username: '', password: '', birthday: '' };

    if ((email.trim() === '') || (!email.includes("@"))) {
      updatedErrors.email = 'emailinvalid';
    }

    if (username.trim() === '') {
      updatedErrors.username = 'usernameinvalid';
    }
  
    if (password.trim() === '') {
      updatedErrors.password = 'passwordinvalid';
    }

    if (birthday === '') {
      updatedErrors.birthday = 'birthdayinvalid';
    }

    if (updatedErrors.email || updatedErrors.password || updatedErrors.username || updatedErrors.birthday) {
      setErrors(updatedErrors);
    } else {
      const doc = await Request('/signupuser', { email: email, username: username, name: name, password: password, birthday: birthday });
      if(doc){
        navigate('/login')
      }
    }
  };

  const handleSelectChange = () => {
    const monthIndex = months.indexOf(selectedMonth);
    const selectedDate = new Date(selectedYear, monthIndex, selectedDay);
    setbirthday(selectedDate.getTime());
  };

  return (
    <div className='relative h-screen w-full flex justify-center items-center text-white'>
      <img src={background} className='h-screen w-full object-cover object-top max-sm:hidden'/>
      <div className='bg-[#313338] pb-6 w-[470px] max-sm:w-full max-sm:h-full h-auto rounded-md max-sm:rounded-none shadow absolute flex'>
        <div className='w-full h-full flex flex-col items-center'>
          <div className='flex flex-col items-center mt-9 mb-6'>
            <h1 className='ggSans600 text-2xl text-center'>Crear una cuenta</h1>
          </div>
          <div className='w-[85%] flex flex-col'>
            <div className='flex flex-col'>
              {
                errors.email === 'emailinvalid' ? 
                <label className='ggSans900 text-xs text-red-400'>CORREO ELECTRÓNICO - <i className='ggSans400'>Requerido</i></label>
                :
                <label className='ggSans900 text-xs text-[#B0B5BC]'>CORREO ELECTRÓNICO</label>
              }
              <input required={true} onChange={(e) => {setemail(e.target.value)}} className='text-gray-300 mt-2 bg-[#1E1F22] outline-none p-2 ggSans400 rounded' type="email"  />
            </div>
            <div className='flex flex-col mt-4'>
              <label className='ggSans900 text-xs text-[#B0B5BC]'>NOMBRE PARA MOSTRAR</label>
              <input required={true} onChange={(e) => {setname(e.target.value)}} className='text-gray-300 mt-2 bg-[#1E1F22] outline-none p-2 ggSans400 rounded' type="text"  />
            </div>
            <div className='flex flex-col mt-4'>
              {
                errors.username === 'usernameinvalid' ? 
                <label className='ggSans900 text-xs text-red-400'>NOMBRE DE USUARIO - <i className='ggSans400'>Requerido</i></label>
                :
                <label className='ggSans900 text-xs text-[#B0B5BC]'>NOMBRE DE USUARIO</label>
              }
              <input required={true} onChange={(e) => {setusername(e.target.value)}} className='text-gray-300 mt-2 bg-[#1E1F22] outline-none p-2 ggSans400 rounded' type="text"  />
            </div>
            <div className='flex flex-col mt-4'>
              {
                errors.password === 'passwordinvalid' ? 
                <label className='ggSans900 text-xs text-red-400'>CONTRASEÑA - <i className='ggSans400'>Requerido</i></label>
                :
                <label className='ggSans900 text-xs text-[#B0B5BC]'>CONTRASEÑA</label>
              }
              <input required={true} onChange={(e) => {setpassword(e.target.value)}} className='text-gray-300 mt-2 bg-[#1E1F22] outline-none p-2 ggSans400 rounded' type="password"  />
            </div>

            <div className='flex flex-col mt-4'>
              {
                errors.birthday === 'birthdayinvalid' ? 
                <label className='ggSans900 text-xs text-red-400'>FECHA DE NACIMIENTO - <i className='ggSans400'>Requerido</i></label>
                :
                <label className='ggSans900 text-xs text-[#B0B5BC]'>FECHA DE NACIMIENTO</label>
              }

              <div className='flex w-full justify-between mt-2'>
                {/* Días */}
                <div className='selectDiv w-3/12'>
                  <Select
                    required={true}
                    placeholder='Dia'
                    className="basic-single ggSans400 outline-none"
                    styles={{
                      control: (provided) => ({...provided, backgroundColor: '#1E1F22', height: '38px', borderRadius: '3px', border: 'none'}),
                      option: (provided, state) => ({...provided, backgroundColor: state.isFocused ? '#35373C' : '#2B2D31', color: 'rgb(209 213 219)', height: '38px', cursor:"pointer"}),
                      singleValue: (provided) => ({...provided, color: '#fff'})
                    }}
                    classNamePrefix="select"
                    defaultValue={0}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    onChange={option => {setSelectedDay(option.value);handleSelectChange()}}
                    isSearchable={false}
                    name="color"
                    options={days.map(day => ({ value: day, label: day }))}
                  />
                </div>
        
                {/* Meses */}

                <div className='selectDiv w-5/12'>
                  <Select
                    required={true}
                    placeholder='Mes'
                    className="basic-single ggSans400 outline-none"
                    styles={{
                      control: (provided) => ({...provided, backgroundColor: '#1E1F22', height: '38px', borderRadius: '3px', border: 'none'}),
                      option: (provided, state) => ({...provided, backgroundColor: state.isFocused ? '#35373C' : '#2B2D31', color: 'rgb(209 213 219)', height: '38px', cursor:"pointer"}),
                      singleValue: (provided) => ({...provided, color: '#fff'})
                    }}
                    classNamePrefix="select"
                    defaultValue={0}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    onChange={option => {setSelectedMonth(option.value);handleSelectChange()}}
                    isSearchable={false}
                    name="color"
                    options={months.map(month => ({ value: month, label: month }))}
                  />
                </div>
        
                {/* Años */}
                
                <div className='selectDiv w-3/12'>
                  <Select
                    required={true}
                    placeholder='Año'
                    className="basic-single ggSans400 outline-none"
                    styles={{
                      control: (provided) => ({...provided, backgroundColor: '#1E1F22', height: '38px', borderRadius: '3px', border: 'none'}),
                      option: (provided, state) => ({...provided, backgroundColor: state.isFocused ? '#35373C' : '#2B2D31', color: 'rgb(209 213 219)', height: '38px', cursor:"pointer"}),
                      singleValue: (provided) => ({...provided, color: '#fff'})
                    }}
                    classNamePrefix="select"
                    defaultValue={0}
                    isDisabled={false}
                    isLoading={false}
                    isClearable={false}
                    isRtl={false}
                    onChange={option => {setSelectedYear(option.value);handleSelectChange()}}
                    isSearchable={false}
                    name="color"
                    options={years.map(year => ({ value: year, label: year }))}
                  />
                </div>              
              </div>
            </div>

            <div className='flex mt-3 items-center'>
              <input type="checkbox" name=""  />
              <p className='text-xs ggSans400 text-[#9299A2]'>(Opcional) Envíame correos con actualizaciones, consejos y ofertas especiales de Discord. Puedes cambiar esta opción en cualquier momento.</p>
            </div>
          </div>

          <div className='mt-5 w-[85%]'>
            <button onClick={handleRegister} className='h-11 bg-[#5865F2] w-full rounded-sm ggSans600'>Continuar</button>
            <p className='text-[12px] ggSans400 mt-2 text-[#9299A2]'>Al registrarte, aceptas las <a className='text-blue-400' href="http://">Condiciones del Servicio</a> y la <a className='text-blue-400' href="http://">Política de Privacidad</a> de Discord.</p>
            <div className='mt-2 text-sm'>
              <a className='text-[#00A8FC] hover:underline ggSans400' href="/login">¿Ya tienes una cuenta?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registerpage
