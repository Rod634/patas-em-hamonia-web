import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './style.css'

export function Animals() {
  return (
    <div>
      <Header></Header>
      <div className='select-section-container-one'>
        <div className='animal-banner'>
          <img src='image_4.png' />
        </div>
        <div className='select-section'>
          <div className='select-section-title'>
            <h1>Bixinhos</h1>
            <img src='Vector_1.png' />
          </div>
          <div className='select-section-container'>
            <div className='select-section-container-filter'>
              <p>Filtrar por</p>
              <select></select>
              <div className='value-filter'>
                <p>Valor</p>
                <select></select>
              </div>
            </div>
            <div className='select-section-container-content'>
              <div className='content'>
                <span>MEOW - GATO (F) - 6 ANOS</span>
                <img src='cross.png' />
              </div>
              <div className='content'>
                <span>MEOW - GATO (F) - 6 ANOS</span>
                <img src='cross.png' />
              </div>
              <div className='content'>
                <span>MEOW - GATO (F) - 6 ANOS</span>
                <img src='cross.png' />
              </div>
              <div className='content'>
                <span>MEOW - GATO (F) - 6 ANOS</span>
                <img src='cross.png' />
              </div>
              <div className='content'>
                <span>MEOW - GATO (F) - 6 ANOS</span>
                <img src='cross.png' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='container-two'>

      </div>
      <Footer></Footer>
    </div>
  );
}
