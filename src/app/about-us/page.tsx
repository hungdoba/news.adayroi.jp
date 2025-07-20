export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Đôi nét về News Adayroi</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Lời cảm ơn!</h2>
        <p className="mb-2">
          Chào bạn, <br></br>
          Cảm ơn bạn đã ghé thăm và ủng hộ trang tin tức của chúng tôi. Chúc bạn
          có những thông tin hữu ích về cộng đồng người Việt tại Nhật Bản.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Người Sáng Lập</h2>
        <p className="mb-2">
          Xin chào! Tôi là một kỹ sư đang làm việc tại Nhật Bản và nhận thấy nhu
          cầu cập nhật thông tin về cộng đồng người Việt tại đây. Trang web này
          được tạo ra nhằm cung cấp thông tin hữu ích cho cộng đồng người Việt
          đang sinh sống, làm việc và học tập tại Nhật Bản.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Sứ Mệnh Của Chúng Tôi</h2>
        <p className="mb-2">
          News AdayRoi được tạo ra với mục tiêu cung cấp thông tin, tin tức mới
          nhất về cộng đồng người Việt tại Nhật Bản một cách nhanh chóng, chính
          xác và dễ tiếp cận.
        </p>
        <p className="mb-2">
          Chúng tôi tin rằng việc cập nhật thông tin không chỉ giúp bạn nắm bắt
          tình hình mà còn kết nối cộng đồng người Việt tại Nhật chặt chẽ hơn.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Tính Năng Chính</h2>
        <p className="mb-2">
          <strong>Tin tức cập nhật:</strong> Chúng tôi thường xuyên cập nhật các
          tin tức mới nhất về cộng đồng người Việt tại Nhật từ nhiều nguồn đáng
          tin cậy.
        </p>
        <p className="mb-2">
          <strong>Dịch thuật bằng AI:</strong> Các bài viết được dịch từ tiếng
          Nhật sang tiếng Việt bằng công nghệ AI hiện đại, giúp thông tin được
          truyền tải nhanh chóng và chính xác.
        </p>
        <p className="mb-2">
          <strong>Đa dạng chủ đề:</strong> Từ việc làm, du học, đời sống đến các
          sự kiện văn hóa, chúng tôi đều cập nhật đầy đủ để bạn không bỏ lỡ
          thông tin quan trọng.
        </p>
        <p className="mb-2">
          <strong>Cộng Đồng Tương Tác:</strong> Bạn có thể đóng góp ý kiến, chia
          sẻ thông tin và tham gia thảo luận thông qua các bình luận trên trang
          web hoặc qua Facebook.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Kết Nối Cộng Đồng</h2>
        <p className="mb-2">
          Chúng tôi mong muốn tạo ra một cầu nối thông tin giữa các thành viên
          trong cộng đồng người Việt tại Nhật. Thông qua việc chia sẻ tin tức,
          kinh nghiệm sống và làm việc, chúng ta có thể hỗ trợ nhau tốt hơn
          trong cuộc sống nơi đất khách.
        </p>
        <p className="mb-2">
          Hãy theo dõi News AdayRoi để không bỏ lỡ những thông tin quan trọng về
          cộng đồng người Việt tại Nhật Bản!
        </p>
      </section>

      <div className="mt-8 text-sm text-gray-600">
        <p>Cập nhật: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
