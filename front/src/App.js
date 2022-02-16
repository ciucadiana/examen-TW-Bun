
import './App.css';
 
import { useEffect, useState } from 'react'

import AfisareVirtualShelf from './components//AfisareVirtualShelf'
import AfisareBooks from './components/AfisareBooks'
import PaginaDeInceput from './components/PaginaDeInceput'
import FormularAdaugareVirtualShelf from './components/FormularAdaugareVirtualShelf'
import FormularAdaugareBooks from './components/FormularAdaugareBooks'


function App() {
  const [currentPage, setCurrentPage] = useState('PaginaDeInceput')

  return (
    <div className="App">

      <>
        <nav className='nav'>

          <a href='#' onClick={() => setCurrentPage('AfisareVirtualShelf')}>
          Afisare VirtualShelf&nbsp;&nbsp;&nbsp;
          </a>
          <a href='#' onClick={() => setCurrentPage('AfisareBooks')}>
          Afisare Books&nbsp;&nbsp;&nbsp;
          </a>
          <a href='#' onClick={() => setCurrentPage('FormularAdaugareVirtualShelf')}>
          Formular adaugare VirtualShelf&nbsp;&nbsp;&nbsp;
          </a>
          <a href='#' onClick={() => setCurrentPage('FormularAdaugareBooks')}>
          Formular adaugare Book&nbsp;&nbsp;&nbsp;
          </a>
        </nav>
        <br></br>
        <br></br>
        {currentPage === 'AfisareVirtualShelf' && <AfisareVirtualShelf />}
        {currentPage === 'AfisareBooks' && <AfisareBooks />}
        {currentPage === 'PaginaDeInceput' && <PaginaDeInceput />}
        {currentPage === 'FormularAdaugareVirtualShelf' && <FormularAdaugareVirtualShelf />}
        {currentPage === 'FormularAdaugareBooks' && <FormularAdaugareBooks />}
      </>
    </div>
  );
}

export default App;
