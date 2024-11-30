import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="footer footer-center bg-pink-300 text-base-content p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by MERI DUKAN Pvt Ltd</p>
                </aside>
            </footer>
        </div>
    )
}

export default Footer
