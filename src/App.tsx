import { motion } from "motion/react";
import { 
  Activity, 
  HelpCircle, 
  Lightbulb, 
  PenTool, 
  ArrowRight, 
  Layers,
  FileText,
  GitMerge,
  CheckCircle2
} from "lucide-react";
import { Mermaid } from "./components/Mermaid";

const diagramCode = `
flowchart TD
    classDef user fill:#e0f2fe,stroke:#0284c7,stroke-width:2px,color:#0f172a
    classDef system fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#0f172a
    classDef google fill:#fce7f3,stroke:#db2777,stroke-width:2px,color:#0f172a
    classDef decision fill:#f3f4f6,stroke:#4b5563,stroke-width:2px,color:#0f172a
    classDef endNode fill:#000,stroke:#000,color:#fff
    classDef startNode fill:#000,stroke:#000,color:#fff

    subgraph Guest [Người dùng chưa đăng nhập]
        ChooseLogin["Truy cập /login hoặc <br/>click Đăng nhập"]:::user
        InputForm["Nhập Email & Password <br/> Click Đăng nhập"]:::user
        ClickGoogle["Click Đăng nhập bằng Google"]:::user
    end

    subgraph System [Hệ thống]
        ValidateForm{"Dữ liệu <br/>hợp lệ?"}:::decision
        ShowValidationError["Hiển thị lỗi text đỏ <br/>(Email/Pass sai định dạng)"]:::system
        
        AuthDB{"Thông tin <br/>trùng khớp?"}:::decision
        ShowWrongMsg["Hiển thị Toast sai thông tin <br/> Tăng biến đếm +1"]:::system
        
        CheckLimit{"Sai >= 5 <br/>lần?"}:::decision
        LockAccount["Khóa tài khoản 30 phút <br/>(BR-01)"]:::system
        
        CheckLock{"Tài khoản <br/>đang khóa?"}:::decision
        ShowLockMsg["Hiển thị thông báo <br/>khóa 30 phút"]:::system
        
        RedirectGoogle["Chuyển hướng sang Google"]:::system
        CheckToken["Kiểm tra email từ Token"]:::system
        
        CreateSession["Khởi tạo phiên làm việc <br/>(Session/JWT Token)"]:::system
        RedirectDash["Chuyển hướng Dashboard <br/>& Báo thành công"]:::system
    end

    subgraph Google [Google Auth]
        GoogleAuth{"Xác thực <br/>thành công?"}:::decision
        ReturnToken["Trả về Token"]:::google
    end

    Start((Start)):::startNode --> ChooseLogin

    ChooseLogin -->|Form| InputForm
    ChooseLogin -->|SSO| ClickGoogle

    InputForm --> ValidateForm
    ValidateForm -->|Không hợp lệ| ShowValidationError
    ShowValidationError --> InputForm
    
    ValidateForm -->|Hợp lệ| AuthDB
    
    AuthDB -->|Sai thông tin| ShowWrongMsg
    ShowWrongMsg --> CheckLimit
    CheckLimit -->|Không| InputForm
    CheckLimit -->|Có| LockAccount
    LockAccount --> ShowLockMsg
    
    AuthDB -->|Trùng khớp| CheckLock
    CheckLock -->|Đang khóa| ShowLockMsg
    ShowLockMsg --> End1((End)):::endNode
    
    CheckLock -->|Không khóa| CreateSession
    
    ClickGoogle --> RedirectGoogle
    RedirectGoogle --> GoogleAuth
    GoogleAuth -->|Thất bại| ChooseLogin
    GoogleAuth -->|Thành công| ReturnToken
    ReturnToken --> CheckToken
    CheckToken --> CreateSession
    
    CreateSession --> RedirectDash
    RedirectDash --> End2((End)):::endNode
`;

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-200 via-sky-300 to-blue-400 text-slate-800 font-sans selection:bg-blue-200">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-sky-300/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Activity size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-900">IT BA Thực Chiến</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">
        {/* Title Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-semibold rounded-full text-sm mb-4">
            Kỹ năng cốt lõi của BA
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Activity Diagram <br className="hidden md:block" />
            <span className="text-blue-600">Hình ảnh hóa Use Case Specification</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-6">
            Thực hành thiết kế Activity Diagram chuẩn mực dựa trên tài liệu Use Case Specification thực tế.
          </p>
        </motion.section>

        {/* 1. Nó là cái gì */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
              <HelpCircle size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">1. Activity Diagram là gì?</h3>
          </div>
          <p className="text-slate-600 leading-relaxed text-lg">
            <strong>Activity Diagram (Biểu đồ hoạt động)</strong> là một dạng biểu đồ hành vi trong UML (Unified Modeling Language). Nó được sử dụng để mô tả luồng công việc (workflow), luồng điều khiển (control flow) từ hoạt động này sang hoạt động khác trong một hệ thống, hoặc chi tiết hóa các bước thực hiện của một Use Case.
          </p>
        </motion.section>

        {/* 2. Tại sao lại cần nó */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
              <Lightbulb size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">2. Tại sao lại cần nó?</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-2">Trực quan hóa Use Case</h4>
              <p className="text-slate-600 text-sm">Giúp BA, Developer và Tester dễ dàng hình dung các luồng đi của một tính năng (Main flow, Alternate flow, Exception flow) thay vì chỉ đọc text khô khan.</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-2">Phát hiện lỗ hổng logic</h4>
              <p className="text-slate-600 text-sm">Khi vẽ ra các luồng rẽ nhánh (decision), ta dễ dàng nhận ra các trường hợp (edge cases) bị thiếu sót trong quá trình phân tích.</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-2">Giao tiếp hiệu quả</h4>
              <p className="text-slate-600 text-sm">Là ngôn ngữ chung, cầu nối hoàn hảo giữa đội ngũ Business (Khách hàng, PO) và Technical (Dev, QC).</p>
            </div>
          </div>
        </motion.section>

        {/* 3. Ví dụ thực tế */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
              <Layers size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">3. Ví dụ thực tế</h3>
          </div>
          <p className="text-slate-600 mb-8 text-lg">
            Dưới đây là ví dụ minh họa cách chuyển hóa từ một tài liệu <strong>Use Case Specification</strong> sang <strong>Activity Diagram</strong> cho tính năng Đăng nhập.
          </p>

          <div className="space-y-12">
            {/* 3.1 Use Case Spec */}
            <div>
              <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                <FileText size={20} className="text-indigo-500" /> 
                3.1. Tài liệu Use Case Specification (Đầu vào)
              </h4>
              <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden text-sm">
                <div className="grid grid-cols-12 border-b border-slate-200">
                  <div className="col-span-3 md:col-span-2 bg-slate-100 p-3 font-semibold text-slate-700 border-r border-slate-200">1. Use Case Name</div>
                  <div className="col-span-9 md:col-span-10 p-3 text-slate-800 font-medium">UC01 - Đăng nhập hệ thống (System Login)</div>
                </div>
                <div className="grid grid-cols-12 border-b border-slate-200">
                  <div className="col-span-3 md:col-span-2 bg-slate-100 p-3 font-semibold text-slate-700 border-r border-slate-200">2. Description</div>
                  <div className="col-span-9 md:col-span-10 p-3 text-slate-600">Cho phép người dùng (Khách hàng, Quản trị viên) đã có tài khoản hợp lệ xác thực danh tính để truy cập vào các tính năng được phân quyền trên hệ thống.</div>
                </div>
                <div className="grid grid-cols-12 border-b border-slate-200">
                  <div className="col-span-3 md:col-span-2 bg-slate-100 p-3 font-semibold text-slate-700 border-r border-slate-200">3. Actor</div>
                  <div className="col-span-9 md:col-span-10 p-3 text-slate-600">Người dùng chưa đăng nhập (Guest)</div>
                </div>
                <div className="grid grid-cols-12 border-b border-slate-200">
                  <div className="col-span-3 md:col-span-2 bg-slate-100 p-3 font-semibold text-slate-700 border-r border-slate-200">4. Trigger</div>
                  <div className="col-span-9 md:col-span-10 p-3 text-slate-600">Người dùng truy cập vào đường dẫn /login hoặc click vào nút "Đăng nhập" trên giao diện trang chủ.</div>
                </div>
                <div className="grid grid-cols-12 border-b border-slate-200">
                  <div className="col-span-3 md:col-span-2 bg-slate-100 p-3 font-semibold text-slate-700 border-r border-slate-200">5. Pre-conditions</div>
                  <div className="col-span-9 md:col-span-10 p-3 text-slate-600">
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Người dùng chưa đăng nhập vào hệ thống.</li>
                      <li>Người dùng đã có tài khoản hợp lệ và đang ở trạng thái Hoạt động (Active).</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-slate-200">
                  <div className="col-span-3 md:col-span-2 bg-slate-100 p-3 font-semibold text-slate-700 border-r border-slate-200">6. Post-conditions</div>
                  <div className="col-span-9 md:col-span-10 p-3 text-slate-600">
                    <ul className="list-disc ml-4 space-y-1">
                      <li>Hệ thống tạo phiên làm việc (Session/JWT Token) cho người dùng.</li>
                      <li>Trạng thái người dùng chuyển sang "Đã đăng nhập".</li>
                      <li>Người dùng được chuyển hướng đến trang Dashboard tương ứng với phân quyền.</li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-slate-200">
                  <div className="col-span-3 md:col-span-2 bg-slate-100 p-3 font-semibold text-slate-700 border-r border-slate-200">7. Main Flow</div>
                  <div className="col-span-9 md:col-span-10 p-3 text-slate-600">
                    <ol className="list-decimal ml-4 space-y-1">
                      <li>Người dùng nhập thông tin vào trường Email và Mật khẩu.</li>
                      <li>Người dùng click nút "Đăng nhập".</li>
                      <li>Hệ thống kiểm tra tính hợp lệ của dữ liệu đầu vào (Validation form).</li>
                      <li>Hệ thống gửi yêu cầu xác thực thông tin (Email và Mật khẩu đã mã hóa) xuống cơ sở dữ liệu.</li>
                      <li>Hệ thống xác nhận thông tin trùng khớp và tài khoản không bị khóa.</li>
                      <li>Hệ thống khởi tạo phiên làm việc (Session) cho người dùng.</li>
                      <li>Hệ thống chuyển hướng người dùng đến trang Dashboard và hiển thị thông báo "Đăng nhập thành công".</li>
                    </ol>
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-slate-200">
                  <div className="col-span-3 md:col-span-2 bg-slate-100 p-3 font-semibold text-slate-700 border-r border-slate-200">8. Alternate Flows</div>
                  <div className="col-span-9 md:col-span-10 p-3 text-slate-600">
                    <p className="font-semibold text-slate-800 mb-1">1a. Đăng nhập bằng SSO (Google/Facebook):</p>
                    <ol className="list-decimal ml-4 space-y-1">
                      <li>Tại bước 1 của luồng chính, người dùng chọn "Đăng nhập bằng Google".</li>
                      <li>Hệ thống chuyển hướng sang trang xác thực của Google.</li>
                      <li>Người dùng xác thực thành công, Google trả về token.</li>
                      <li>Hệ thống kiểm tra email từ token, tự động đăng nhập và tiếp tục từ bước 6 của luồng chính.</li>
                    </ol>
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-slate-200">
                  <div className="col-span-3 md:col-span-2 bg-slate-100 p-3 font-semibold text-slate-700 border-r border-slate-200">9. Exception Flows</div>
                  <div className="col-span-9 md:col-span-10 p-3 text-slate-600 space-y-3">
                    <div>
                      <p className="font-semibold text-slate-800">3a. Dữ liệu không hợp lệ (Validation Error):</p>
                      <p>Tại bước 3, nếu Email sai định dạng hoặc Mật khẩu để trống, hệ thống hiển thị lỗi text màu đỏ dưới trường tương ứng. Người dùng ở lại trang hiện tại.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">5a. Sai thông tin đăng nhập:</p>
                      <p>Tại bước 5, nếu Email không tồn tại hoặc Mật khẩu không khớp, hệ thống hiển thị Toast message "Email hoặc mật khẩu không chính xác". Tăng biến đếm số lần nhập sai lên 1.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">5b. Tài khoản bị khóa:</p>
                      <p>Tại bước 5, nếu trạng thái tài khoản là "Locked", hệ thống chặn đăng nhập và hiển thị thông báo "Tài khoản của bạn đã bị khóa do nhập sai mật khẩu nhiều lần. Vui lòng thử lại sau 30 phút."</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 border-b border-slate-200">
                  <div className="col-span-3 md:col-span-2 bg-slate-100 p-3 font-semibold text-slate-700 border-r border-slate-200">10. Business Rules</div>
                  <div className="col-span-9 md:col-span-10 p-3 text-slate-600 space-y-1">
                    <p><strong>BR-01 (Khóa bảo vệ):</strong> Hệ thống tự động khóa tài khoản tạm thời (30 phút) nếu người dùng nhập sai mật khẩu liên tiếp 5 lần.</p>
                    <p><strong>BR-02 (Định dạng Email):</strong> Email phải tuân thủ chuẩn RFC 5322 (vd: user@domain.com).</p>
                    <p><strong>BR-03 (Session Timeout):</strong> Phiên đăng nhập sẽ tự động hết hạn sau 24 giờ nếu người dùng không có bất kỳ tương tác nào với hệ thống.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 3.2 Activity Diagram */}
            <div>
              <h4 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
                <GitMerge size={20} className="text-emerald-500" /> 
                3.2. Activity Diagram (Đầu ra)
              </h4>
              <p className="text-slate-600 mb-6">
                Dựa vào Use Case Spec ở trên, chúng ta sẽ thiết kế Activity Diagram với 3 phân làn (Swimlanes): <strong>Guest</strong>, <strong>Hệ thống</strong>, và <strong>Google Auth</strong>. Sơ đồ này thể hiện rõ ràng các điểm rẽ nhánh (Decision Nodes) được mô tả trong Alternative và Exception flows.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-12 flex items-center justify-center text-center min-h-[300px]">
                <p className="text-slate-500 italic text-lg">Để trình bày mẫu Activity diagram riêng. Con AI này nó không vẽ được</p>
              </div>

              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <h4 className="font-bold text-emerald-800 flex items-center gap-2 mb-2">
                    <CheckCircle2 size={18} /> Main Flow
                  </h4>
                  <p className="text-sm text-emerald-700">Luồng đi thẳng từ trên xuống dưới, vượt qua các Decision Node một cách trơn tru (Hợp lệ {'>'} Trùng khớp {'>'} Không khóa {'>'} Create Session).</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <h4 className="font-bold text-blue-800 flex items-center gap-2 mb-2">
                    <CheckCircle2 size={18} /> Alternate Flow
                  </h4>
                  <p className="text-sm text-blue-700">Luồng rẽ sang nhánh Google Auth, xử lý xác thực bên thứ 3 và quay trở lại luồng chính để tạo Session.</p>
                </div>
                <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                  <h4 className="font-bold text-rose-800 flex items-center gap-2 mb-2">
                    <CheckCircle2 size={18} /> Exception Flows
                  </h4>
                  <p className="text-sm text-rose-700">Các luồng rẽ nhánh báo lỗi (Validation Error, Sai thông tin) và vòng lặp quay lại bước nhập, hoặc kết thúc sớm (Khóa tài khoản).</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* 4. Cách thiết kế Activity diagram */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-xl">
              <PenTool size={28} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">4. Cách thiết kế Activity Diagram</h3>
          </div>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent mt-12">
            
            {/* Step 1 */}
            <div className="relative flex flex-col md:flex-row gap-6 items-start md:justify-between">
              <div className="md:w-5/12 order-2 md:order-1 md:text-right pt-2">
                <h4 className="text-xl font-bold text-slate-800 mb-3">Xác định điểm bắt đầu và kết thúc</h4>
                <p className="text-slate-600 mb-4">Mọi quy trình đều cần có điểm khởi đầu và kết thúc rõ ràng. Hãy đọc kỹ phần <strong>Trigger</strong> và <strong>Post-conditions</strong> trong Use Case Spec.</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 font-black text-xl shrink-0 z-10 border-4 border-white shadow-sm order-1 md:order-2 md:absolute md:left-1/2 md:-translate-x-1/2">1</div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 md:w-5/12 order-3">
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-800 shrink-0"></div>
                    <span className="text-sm font-medium text-slate-700">Initial Node (Bắt đầu)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-slate-800 flex items-center justify-center shrink-0">
                      <div className="w-3 h-3 rounded-full bg-slate-800"></div>
                    </div>
                    <span className="text-sm font-medium text-slate-700">Final Node (Kết thúc)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col md:flex-row gap-6 items-start md:justify-between">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 md:w-5/12 order-3 md:order-1">
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-sm">
                  <span className="font-semibold text-slate-700">💡 Mẹo ứng dụng:</span> Trong ví dụ Đăng nhập, ta có 3 làn: 
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-block bg-blue-50 border border-blue-200 text-blue-700 px-3 py-1.5 rounded-md font-medium">Guest</span> 
                    <span className="inline-block bg-amber-50 border border-amber-200 text-amber-700 px-3 py-1.5 rounded-md font-medium">Hệ thống</span>
                    <span className="inline-block bg-pink-50 border border-pink-200 text-pink-700 px-3 py-1.5 rounded-md font-medium">Google Auth</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 font-black text-xl shrink-0 z-10 border-4 border-white shadow-sm order-1 md:order-2 md:absolute md:left-1/2 md:-translate-x-1/2">2</div>
              <div className="md:w-5/12 order-2 md:order-3 pt-2">
                <h4 className="text-xl font-bold text-slate-800 mb-3">Phân chia làn bơi (Swimlanes)</h4>
                <p className="text-slate-600 mb-4">Nhìn vào mục <strong>Actor</strong> và các hệ thống tương tác để chia cột. Mỗi cột đại diện cho một đối tượng thực hiện hành động.</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col md:flex-row gap-6 items-start md:justify-between">
              <div className="md:w-5/12 order-2 md:order-1 md:text-right pt-2">
                <h4 className="text-xl font-bold text-slate-800 mb-3">Vẽ luồng chính (Main Flow)</h4>
                <p className="text-slate-600 mb-4">Đọc từng bước trong mục <strong>Main Flow</strong> của Use Case Spec. Chuyển mỗi bước thành một hành động (Action) và nối chúng lại bằng mũi tên theo thứ tự thời gian.</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 font-black text-xl shrink-0 z-10 border-4 border-white shadow-sm order-1 md:order-2 md:absolute md:left-1/2 md:-translate-x-1/2">3</div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 md:w-5/12 order-3">
                <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <div className="px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-center text-slate-700">Nhập Email/Pass</div>
                  <ArrowRight size={16} className="text-slate-400 rotate-90 sm:rotate-0 shrink-0" />
                  <div className="px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg text-sm font-medium text-center text-slate-700">Click Đăng nhập</div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative flex flex-col md:flex-row gap-6 items-start md:justify-between">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 md:w-5/12 order-3 md:order-1">
                <div className="bg-white p-6 rounded-xl border border-slate-200 flex flex-col items-center">
                  <div className="w-16 h-16 bg-slate-50 border-2 border-slate-400 rotate-45 flex items-center justify-center mb-6">
                    <span className="-rotate-45 text-xs font-bold text-slate-600 text-center leading-tight">Dữ liệu<br/>hợp lệ?</span>
                  </div>
                  <div className="flex w-full justify-between px-4 relative -mt-10">
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-rose-500 bg-white px-1 z-10">[Không]</span>
                      <div className="w-px h-6 bg-slate-300"></div>
                      <div className="px-2 py-1 bg-rose-50 border border-rose-200 rounded text-xs mt-1 text-rose-700 font-medium">Báo lỗi</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] font-bold text-emerald-500 bg-white px-1 z-10">[Có]</span>
                      <div className="w-px h-6 bg-slate-300"></div>
                      <div className="px-2 py-1 bg-emerald-50 border border-emerald-200 rounded text-xs mt-1 text-emerald-700 font-medium">Đi tiếp</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 font-black text-xl shrink-0 z-10 border-4 border-white shadow-sm order-1 md:order-2 md:absolute md:left-1/2 md:-translate-x-1/2">4</div>
              <div className="md:w-5/12 order-2 md:order-3 pt-2">
                <h4 className="text-xl font-bold text-slate-800 mb-3">Thêm các rẽ nhánh (Decision)</h4>
                <p className="text-slate-600 mb-4">Đọc mục <strong>Alternate Flows</strong> và <strong>Exception Flows</strong>. Sử dụng hình thoi để đặt câu hỏi kiểm tra. Đừng quên ghi chú điều kiện (Guard Conditions) lên các mũi tên rẽ nhánh.</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="relative flex flex-col md:flex-row gap-6 items-start md:justify-between">
              <div className="md:w-5/12 order-2 md:order-1 md:text-right pt-2">
                <h4 className="text-xl font-bold text-slate-800 mb-3">Đối chiếu và Hoàn thiện</h4>
                <p className="text-slate-600 mb-4">Bước cuối cùng cực kỳ quan trọng: Rà soát lại toàn bộ biểu đồ và đối chiếu với mục <strong>Business Rules</strong> để đảm bảo không bỏ sót logic nào.</p>
              </div>
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 text-rose-600 font-black text-xl shrink-0 z-10 border-4 border-white shadow-sm order-1 md:order-2 md:absolute md:left-1/2 md:-translate-x-1/2">5</div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 md:w-5/12 order-3">
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Đã có luồng xử lý khóa tài khoản khi sai 5 lần (BR-01) chưa?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Các điểm kết thúc (Final Node) đã phản ánh đúng Post-conditions chưa?</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>Mọi luồng đều phải dẫn đến Final Node, không được có "ngõ cụt".</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center mt-12">
        <p>© 2026 IT BA Sharing. Kiến thức thực chiến từ kinh nghiệm làm nghề.</p>
      </footer>
    </div>
  );
}

