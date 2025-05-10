// src/app/not-found.js

export default function NotFound() {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1 style={{ fontSize: '50px', color: '#ff0000' }}>404</h1>
            <p style={{ fontSize: '20px' }}>Trang bạn tìm không tồn tại!</p>
            <p>
                <a href="/" style={{ color: '#0070f3' }}>Quay lại trang chủ</a>
            </p>
        </div>
    );
}
