import Footer from '../../components/Footer';
import Header from '../../components/Header';
import './style.css'

interface IHomeProps {
}

export function Home() {
  return (
    <div>
      <Header></Header>
      <body>
        {/* <div className='container-one'>
          <div className='image-box'>
            <img src='image_3.png' />
          </div>
          <div className='info-box'>
            <div className='title'>
              <h1>Patas em Harmonia</h1>
              <img src="" />
            </div>
            <div className='info-title'>
              <h1>Nosso <p>AU</p>bjetivo</h1>
              <img src="" />
            </div>
            <div className='info-text'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                Vestibulum vehicula fermentum magna, a viverra ipsum 
                blandit nec. Phasellus tincidunt ultricies pellentesque. 
                Aenean eu metus id felis vestibulum sodales hendrerit quis nunc. 
                Suspendisse potenti. Aliquam erat volutpat. Sed ex massa, 
                pulvinar in sem dictum, pharetra tristique turpis.
              </p>
            </div>
            <div className='button'>
              <button>Castre seu bixinho</button>
            </div>
          </div>
        </div> */}
      </body>
      <Footer></Footer>
    </div>
  );
}
