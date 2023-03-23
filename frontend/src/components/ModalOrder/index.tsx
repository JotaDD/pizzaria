import styles from './styles.module.scss'
import Modal from 'react-modal'

import { FiX } from 'react-icons/fi'

import { OrderItemProps } from '../../pages/dashboard'

interface ModalOrderProps {
  isOpen: boolean
  onRequestClose: () => void
  order: OrderItemProps[]
}

export function ModalOrder({ isOpen, onRequestClose, order }: ModalOrderProps) {
  const customStyles = {
    content: {
      top: '50%',
      bottom: 'auto',
      left: '50%',
      right: 'auto',
      padding: '30px',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#1D1D2E'
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <button
        type='button'
        onClick={onRequestClose}
        className='react-modal-close'
        style={{ background: 'transparent', border: 0 }}
      >
        <FiX size={45} color='#F34748' />

      </button>

      <div className={styles.container} >
        <h2>Detalhes do pedido</h2>
        <span className={styles.table}>
          Mesa: <strong>{order[0].order.table}</strong>
        </span>
        {order.map((item) => (
          <section key={item.id} className={styles.containerItem} >
            <span>{item.amount} - <strong>{item.product.name}</strong></span>
            <span className={styles.description}>
              {item.product.description}
            </span>
          </section>
        ))}

        <button onClick={() => { }} className={styles.buttonOrder}>Concluir Pedido</button>




      </div>

    </Modal>
  )
}