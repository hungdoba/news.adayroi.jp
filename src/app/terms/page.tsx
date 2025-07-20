export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Điều khoản và Điều kiện</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">1. Chấp nhận Điều khoản</h2>
        <p className="mb-2">
          Bằng việc truy cập hoặc sử dụng trang web tin tức Việt Nam tại Nhật
          của chúng tôi, bạn đồng ý tuân thủ và bị ràng buộc bởi các Điều khoản
          và Điều kiện này.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">2. Sử dụng Nội dung</h2>
        <p className="mb-2">
          Tất cả các bài viết, tin tức, và thông tin được cung cấp trên trang
          web này chỉ dành cho mục đích đọc tin cá nhân, phi thương mại.
        </p>
        <p className="mb-2">
          Nghiêm cấm sao chép, phân phối hoặc sử dụng vì mục đích thương mại các
          nội dung của chúng tôi khi không được phép.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">3. Sở hữu Trí tuệ</h2>
        <p className="mb-2">
          Nhiều nội dung trên trang web được dịch từ các nguồn tin khác trên
          Internet. Chúng tôi ghi nhận quyền sở hữu trí tuệ của các tác giả và
          nguồn gốc ban đầu.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          4. Độ chính xác của Nội dung
        </h2>
        <p className="mb-2">
          Nhiều bài viết trên trang web được dịch tự động bằng công nghệ AI. Mặc
          dù chúng tôi cố gắng đảm bảo tính chính xác, nhưng dịch thuật AI có
          thể chứa lỗi hoặc thiếu sót. Người đọc nên cân nhắc và tham khảo thêm
          các nguồn khác trước khi dựa vào thông tin.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">5. Tài khoản Người dùng</h2>
        <p className="mb-2">
          Nếu bạn tạo tài khoản trên trang web của chúng tôi, bạn có trách nhiệm
          duy trì tính bảo mật thông tin tài khoản của mình và chịu trách nhiệm
          cho mọi hoạt động dưới tài khoản của bạn.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">6. Giới hạn Trách nhiệm</h2>
        <p className="mb-2">
          Chúng tôi không chịu trách nhiệm về tính chính xác, đầy đủ hoặc hữu
          ích của thông tin được cung cấp, đặc biệt là với nội dung được dịch
          bằng AI. Chúng tôi không chịu trách nhiệm cho bất kỳ thiệt hại trực
          tiếp, gián tiếp phát sinh từ việc sử dụng thông tin trên trang web.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">7. Thay đổi Điều khoản</h2>
        <p className="mb-2">
          Chúng tôi có quyền sửa đổi các điều khoản này bất cứ lúc nào. Việc
          tiếp tục sử dụng trang web sau những thay đổi đó đồng nghĩa với việc
          bạn chấp nhận các điều khoản đã được sửa đổi.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">
          8. Nguồn tin và Bản quyền
        </h2>
        <p className="mb-2">
          Nội dung trên trang web được tổng hợp từ nhiều nguồn khác nhau. Chúng
          tôi cố gắng ghi rõ nguồn gốc khi có thể, nhưng không đảm bảo tính đầy
          đủ của việc ghi nhận nguồn tin trong mọi trường hợp.
        </p>
      </section>

      <div className="mt-8 text-sm text-gray-600">
        <p>Last updated: {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
}
