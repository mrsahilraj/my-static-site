import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button/Button.jsx'
import Reveal from '../../components/ui/Reveal/Reveal.jsx'
import Modal from '../../components/ui/Modal/Modal.jsx'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import styles from './MyBookings.module.css'

// Mock bookings data with complete details
const mockBookings = [
  {
    id: 'BK-1001',
    studioName: 'Grand Studio',
    studioDescription: 'Professional studio space with acoustic treatment, soundproofing, and high-end audio equipment for recording, music production, and professional shoots.',
    date: '2025-06-20',
    time: '10:00 AM',
    duration: 2,
    createdAt: '2025-06-10T09:15:00Z',
    equipment: [
      { name: 'SM7B Microphone', quantity: 2, price: 1500 },
      { name: 'Audio Interface', quantity: 1, price: 1200 }
    ],
    status: 'Confirmed',
    total: 4200,
    customer: {
      fullName: 'Aarav Sharma',
      mobile: '+91 98765 43210',
      email: 'aarav@example.com'
    },
    payment: {
      amount: 4200,
      status: 'Paid',
      method: 'UPI',
      transactionId: 'UPI-2025061012345'
    },
    notes: {
      specialRequests: 'Need extra power outlets for laptop setup.',
      bookingNotes: 'First-time booking for podcast recording.'
    }
  },
  {
    id: 'BK-1002',
    studioName: 'Long Studio',
    studioDescription: 'Long-format studio optimized for extended shooting, interview sets, and content creation with linear lighting and space for multiple talent.',
    date: '2025-06-25',
    time: '2:00 PM',
    duration: 3,
    createdAt: '2025-06-12T14:30:00Z',
    equipment: [
      { name: 'Studio Monitors', quantity: 1, price: 2000 }
    ],
    status: 'Pending',
    total: 6200,
    customer: {
      fullName: 'Aarav Sharma',
      mobile: '+91 98765 43210',
      email: 'aarav@example.com'
    },
    payment: {
      amount: 6200,
      status: 'Pending',
      method: 'Credit Card',
      transactionId: 'CC-2025061298765'
    },
    notes: {
      specialRequests: '',
      bookingNotes: 'Interview shoot for brand campaign.'
    }
  },
  {
    id: 'BK-1003',
    studioName: 'Mini Studio',
    studioDescription: 'Compact studio perfect for solo creators, voiceovers, quick recordings, and small-format content production.',
    date: '2025-06-15',
    time: '11:00 AM',
    duration: 1,
    createdAt: '2025-06-08T10:00:00Z',
    equipment: [],
    status: 'Completed',
    total: 1700,
    customer: {
      fullName: 'Aarav Sharma',
      mobile: '+91 98765 43210',
      email: 'aarav@example.com'
    },
    payment: {
      amount: 1700,
      status: 'Paid',
      method: 'UPI',
      transactionId: 'UPI-2025060845678'
    },
    notes: {
      specialRequests: 'Prefer natural lighting setup.',
      bookingNotes: 'Voiceover session completed successfully.'
    }
  }
]

export default function MyBookings() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setBookings(mockBookings)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  function getStatusStyle(status) {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return { bg: 'rgba(88, 125, 78, 0.1)', color: '#385230' }
      case 'pending':
        return { bg: 'rgba(168, 112, 43, 0.1)', color: '#a8702b' }
      case 'completed':
        return { bg: 'rgba(112, 112, 112, 0.1)', color: '#4a4a4a' }
      default:
        return { bg: 'rgba(112, 112, 112, 0.1)', color: '#4a4a4a' }
    }
  }

  function openBookingDetails(booking) {
    setSelectedBooking(booking)
    setModalOpen(true)
  }

  function closeBookingDetails() {
    setModalOpen(false)
    setTimeout(() => setSelectedBooking(null), 300)
  }

  function formatDate(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  }

  function formatDateTime(dateStr) {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }

  function calculateEquipmentTotal(equipment) {
    return equipment.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  function downloadReceipt(booking) {
    setDownloading(true)
    try {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
      
      // Header
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(24)
      doc.setTextColor(26, 15, 10)
      doc.text('SIMAR SINGH STUDIOS', pageWidth / 2, 25, { align: 'center' })
      
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(100, 100, 100)
      doc.text('Rajouri Garden, New Delhi', pageWidth / 2, 33, { align: 'center' })
      
      // Line separator
      doc.setLineWidth(0.5)
      doc.setDrawColor(200, 200, 200)
      doc.line(20, 40, pageWidth - 20, 40)
      
      // Booking Info
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(26, 15, 10)
      doc.text('Booking Receipt', 20, 52)
      
      const bookingInfoData = [
        ['Booking ID', booking.id],
        ['Booking Date', booking.date],
        ['Booking Time', booking.time],
        ['Booking Status', booking.status],
      ]
      
      autoTable(doc, {
        startY: 58,
        head: [['', '']],
        body: bookingInfoData,
        theme: 'plain',
        styles: { fontSize: 12, cellPadding: 3, textColor: [26, 15, 10] },
        columnStyles: {
          0: { fontStyle: 'bold', textColor: [120, 120, 120], cellWidth: 60 },
        },
      })
      
      // Customer Info
      const yAfterBookingInfo = doc.lastAutoTable.finalY + 10
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text('Customer Information', 20, yAfterBookingInfo)
      
      const customerInfoData = [
        ['Full Name', booking.customer.fullName],
        ['Mobile Number', booking.customer.mobile],
        ['Email Address', booking.customer.email],
      ]
      
      autoTable(doc, {
        startY: yAfterBookingInfo + 6,
        head: [['', '']],
        body: customerInfoData,
        theme: 'plain',
        styles: { fontSize: 12, cellPadding: 3, textColor: [26, 15, 10] },
        columnStyles: {
          0: { fontStyle: 'bold', textColor: [120, 120, 120], cellWidth: 60 },
        },
      })
      
      // Studio Info
      const yAfterCustomerInfo = doc.lastAutoTable.finalY + 10
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.text('Studio Information', 20, yAfterCustomerInfo)
      
      doc.setFontSize(12)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(26, 15, 10)
      doc.text(booking.studioName, 20, yAfterCustomerInfo + 8)
      doc.setFontSize(11)
      doc.setTextColor(120, 120, 120)
      doc.text(booking.studioDescription, 20, yAfterCustomerInfo + 14, { maxWidth: pageWidth - 40 })
      
      // Equipment Info
      const yAfterStudioInfo = yAfterCustomerInfo + 24
      if (booking.equipment.length > 0) {
        doc.setFontSize(14)
        doc.setFont('helvetica', 'bold')
        doc.setTextColor(26, 15, 10)
        doc.text('Equipment Information', 20, yAfterStudioInfo)
        
        const equipmentData = booking.equipment.map(item => [
          item.name,
          item.quantity,
          `₹${item.price.toLocaleString()}`,
          `₹${(item.price * item.quantity).toLocaleString()}`
        ])
        
        autoTable(doc, {
          startY: yAfterStudioInfo + 6,
          head: [['Item', 'Qty', 'Price', 'Total']],
          body: equipmentData,
          theme: 'grid',
          headStyles: {
            fillColor: [168, 112, 43],
            textColor: 255,
            fontStyle: 'bold',
          },
          styles: { fontSize: 11, cellPadding: 4 },
        })
      }
      
      // Payment Info
      const yAfterEquipment = booking.equipment.length > 0 ? doc.lastAutoTable.finalY + 10 : yAfterStudioInfo
      doc.setFontSize(14)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(26, 15, 10)
      doc.text('Payment Information', 20, yAfterEquipment)
      
      const paymentData = [
        ['Studio Charges', `₹${(booking.total - calculateEquipmentTotal(booking.equipment) - 200).toLocaleString()}`],
        ['Equipment Charges', `₹${calculateEquipmentTotal(booking.equipment).toLocaleString()}`],
        ['Convenience Charges', '₹200'],
        ['Total Amount', `₹${booking.total.toLocaleString()}`],
        ['Payment Method', booking.payment.method],
        ['Transaction ID', booking.payment.transactionId || 'N/A'],
        ['Payment Status', booking.payment.status],
      ]
      
      autoTable(doc, {
        startY: yAfterEquipment + 6,
        head: [['', '']],
        body: paymentData,
        theme: 'plain',
        styles: { fontSize: 12, cellPadding: 3, textColor: [26, 15, 10] },
        columnStyles: {
          0: { fontStyle: 'bold', textColor: [120, 120, 120], cellWidth: 70 },
        },
      })
      
      // Footer
      const pageHeight = doc.internal.pageSize.getHeight()
      doc.setFontSize(10)
      doc.setTextColor(120, 120, 120)
      doc.text('Thank you for booking with Simar Singh Studios!', pageWidth / 2, pageHeight - 30, { align: 'center' })
      doc.text('For support: Call us at +91 98212 3177', pageWidth / 2, pageHeight - 22, { align: 'center' })
      
      doc.save(`Receipt-${booking.id}.pdf`)
    } catch (error) {
      console.error('Error generating receipt:', error)
      alert('Failed to download receipt. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className={styles.page}>
      <Reveal>
        <header className={styles.header}>
          <h1 className={styles.title}>My Bookings</h1>
          <p className={styles.subtitle}>
            View and manage your studio booking history
          </p>
          <Button onClick={() => navigate('/bookings')}>
            Book a New Session
          </Button>
        </header>
      </Reveal>

      <Reveal>
        {loading ? (
          <div className={styles.loading}>Loading bookings…</div>
        ) : bookings.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🎵</div>
            <div className={styles.emptyTitle}>No Bookings Yet</div>
            <div className={styles.emptySub}>
              Book your first studio session to get started!
            </div>
            <Button onClick={() => navigate('/bookings')}>
              Book a Session
            </Button>
          </div>
        ) : (
          <div className={styles.bookingsList} role="list">
            {bookings.map((booking) => {
              const statusStyle = getStatusStyle(booking.status)
              return (
                <article key={booking.id} className={styles.bookingCard} role="listitem">
                  <div className={styles.bookingHeader}>
                    <div className={styles.bookingId}>{booking.id}</div>
                    <div 
                      className={styles.bookingStatus} 
                      style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
                    >
                      {booking.status}
                    </div>
                  </div>

                  <div className={styles.bookingBody}>
                    <div className={styles.bookingInfo}>
                      <div className={styles.bookingInfoItem}>
                        <span className={styles.bookingLabel}>Studio</span>
                        <span className={styles.bookingValue}>{booking.studioName}</span>
                      </div>
                      <div className={styles.bookingInfoItem}>
                        <span className={styles.bookingLabel}>Date</span>
                        <span className={styles.bookingValue}>{booking.date}</span>
                      </div>
                      <div className={styles.bookingInfoItem}>
                        <span className={styles.bookingLabel}>Time</span>
                        <span className={styles.bookingValue}>{booking.time} · {booking.duration} hr{booking.duration > 1 ? 's' : ''}</span>
                      </div>
                    </div>

                    {booking.equipment.length > 0 && (
                      <div className={styles.bookingEquipment}>
                        <div className={styles.bookingLabel}>Equipment</div>
                        <div className={styles.equipmentList}>
                          {booking.equipment.map((eq, idx) => (
                            <span key={idx} className={styles.equipmentTag}>
                              {eq.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className={styles.bookingFooter}>
                      <div className={styles.bookingTotal}>
                        Total: <span className={styles.totalAmount}>₹{booking.total.toLocaleString()}</span>
                      </div>
                      <div className={styles.bookingActions}>
                        <Button 
                          size="sm" 
                          variant="secondary"
                          onClick={() => openBookingDetails(booking)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </Reveal>

      {selectedBooking && (
        <Modal
          open={modalOpen}
          title={`Booking Details · ${selectedBooking.id}`}
          description={`${selectedBooking.studioName}`}
          onClose={closeBookingDetails}
          size='lg'
        >
          <div className={styles.bookingDetails}>
            <div className={styles.detailsSection}>
              <div className={styles.detailsSectionHeader}>Booking Information</div>
              <div className={styles.detailsGrid}>
                <div className={styles.detailsItem}>
                  <span className={styles.detailsLabel}>Booking ID</span>
                  <span className={styles.detailsValue}>{selectedBooking.id}</span>
                </div>
                <div className={styles.detailsItem}>
                    <span className={styles.detailsLabel}>Status</span>
                    <span 
                      className={styles.detailsStatus} 
                      style={{ backgroundColor: getStatusStyle(selectedBooking.status).bg, color: getStatusStyle(selectedBooking.status).color }}
                    >
                      {selectedBooking.status}
                    </span>
                  </div>
                <div className={styles.detailsItem}>
                  <span className={styles.detailsLabel}>Booking Date</span>
                  <span className={styles.detailsValue}>{selectedBooking.date}</span>
                </div>
                <div className={styles.detailsItem}>
                  <span className={styles.detailsLabel}>Time</span>
                  <span className={styles.detailsValue}>{selectedBooking.time} · {selectedBooking.duration} hr{selectedBooking.duration > 1 ? 's' : ''}</span>
                </div>
                <div className={styles.detailsItem}>
                  <span className={styles.detailsLabel}>Created On</span>
                  <span className={styles.detailsValue}>{formatDateTime(selectedBooking.createdAt)}</span>
                </div>
              </div>
            </div>

            <div className={styles.detailsSection}>
              <div className={styles.detailsSectionHeader}>Studio Information</div>
              <div className={styles.studioInfo}>
                <div className={styles.studioName}>{selectedBooking.studioName}</div>
                <div className={styles.studioDesc}>{selectedBooking.studioDescription}</div>
              </div>
            </div>

            {selectedBooking.equipment.length > 0 && (
              <div className={styles.detailsSection}>
                <div className={styles.detailsSectionHeader}>Equipment</div>
                <div className={styles.equipmentGrid}>
                  {selectedBooking.equipment.map((item, idx) => (
                    <div key={idx} className={styles.equipmentItem}>
                      <div className={styles.equipmentName}>{item.name}</div>
                      <div className={styles.equipmentQtyPrice}>
                        <span>× {item.quantity}</span>
                        <span>₹{item.price.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                  <div className={styles.equipmentTotal}>
                      Total: <span>₹{calculateEquipmentTotal(selectedBooking.equipment).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            <div className={styles.detailsSection}>
              <div className={styles.detailsSectionHeader}>Customer Information</div>
              <div className={styles.detailsGrid}>
                <div className={styles.detailsItem}>
                  <span className={styles.detailsLabel}>Full Name</span>
                  <span className={styles.detailsValue}>{selectedBooking.customer.fullName}</span>
                </div>
                <div className={styles.detailsItem}>
                  <span className={styles.detailsLabel}>Mobile Number</span>
                  <span className={styles.detailsValue}>{selectedBooking.customer.mobile}</span>
                </div>
                <div className={styles.detailsItem}>
                  <span className={styles.detailsLabel}>Email Address</span>
                  <span className={styles.detailsValue}>{selectedBooking.customer.email}</span>
                </div>
              </div>
            </div>

            <div className={styles.detailsSection}>
              <div className={styles.detailsSectionHeader}>Payment Information</div>
              <div className={styles.detailsGrid}>
                <div className={styles.detailsItem}>
                  <span className={styles.detailsLabel}>Total Amount</span>
                  <span className={styles.detailsValue} style={{color:'#1a0f0a', fontWeight:'900', fontSize:'18px'}}>₹{selectedBooking.payment.amount.toLocaleString()}</span>
                </div>
                <div className={styles.detailsItem}>
                  <span className={styles.detailsLabel}>Payment Status</span>
                  <span className={styles.detailsValue}>{selectedBooking.payment.status}</span>
                </div>
                <div className={styles.detailsItem}>
                  <span className={styles.detailsLabel}>Payment Method</span>
                  <span className={styles.detailsValue}>{selectedBooking.payment.method}</span>
                </div>
                <div className={styles.detailsItem}>
                  <span className={styles.detailsLabel}>Transaction ID</span>
                  <span className={styles.detailsValue}>{selectedBooking.payment.transactionId}</span>
                </div>
              </div>
            </div>



            <div className={styles.detailsActions}>
              <Button onClick={closeBookingDetails} variant="secondary">Back to My Bookings</Button>
              <Button onClick={() => downloadReceipt(selectedBooking)} disabled={downloading}>
                {downloading ? 'Generating...' : 'Download Receipt'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}
