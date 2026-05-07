import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
/*이전 코드 업로드를 위한 주석*/
function Signup({ addUser }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // 1. react-hook-form 설정 (실시간 유효성 검사 모드)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      userId: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // 2. sessionStorage 연동: 작성 중인 데이터 유지
  useEffect(() => {
    const draft = sessionStorage.getItem('session3-signup-draft');
    if (draft) reset(JSON.parse(draft));
  }, [reset]);

  const formValues = watch(); 
  useEffect(() => {
    sessionStorage.setItem('session3-signup-draft', JSON.stringify(formValues));
  }, [formValues]);

  // 3. 제출 처리: 피드백에 따라 메인(/)으로 이동
  const onValidSubmit = (data) => {
    if (addUser) addUser({ userId: data.userId, password: data.password });
    alert('회원가입 성공! 메인 페이지로 이동합니다.');
    
    sessionStorage.removeItem('session3-signup-draft'); 
    
    // [과제 조건 준수]: UX상 /login이 자연스럽지만, 조건에 따라 /로 이동합니다.
    navigate('/'); 
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '40px' }}>
      <h2 style={{ marginBottom: '30px' }}>회원가입</h2>

      <form onSubmit={handleSubmit(onValidSubmit)} style={{ border: '1px solid #444', padding: '30px', width: '400px', display: 'flex', flexDirection: 'column', gap: '20px', boxSizing: 'border-box' }}>
        
        {/* 아이디 영역: 정규식 적용 (영문·숫자 4~20자) */}
        <div>
          <label style={{ display: 'block', textAlign: 'center', marginBottom: '8px', color: '#ccc', fontSize: '14px' }}>아이디</label>
          <input 
            type="text" 
            placeholder="영문·숫자 4~20자" 
            style={{ width: '100%', padding: '10px', backgroundColor: '#2c2c2e', border: '1px solid #555', color: '#fff', boxSizing: 'border-box' }} 
            {...register("userId", {
              required: "아이디를 입력해 주세요.",
              pattern: {
                value: /^[a-zA-Z0-9]{4,20}$/,
                message: "아이디는 영문·숫자 4~20자로 입력해 주세요."
              }
            })}
          />
          {errors.userId && <span style={{ display: 'block', color: '#ff3b3b', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>{errors.userId.message}</span>}
        </div>

        {/* 이메일 영역 */}
        <div>
          <label style={{ display: 'block', textAlign: 'center', marginBottom: '8px', color: '#ccc', fontSize: '14px' }}>이메일</label>
          <input 
            type="email" 
            placeholder="example@domain.com" 
            style={{ width: '100%', padding: '10px', backgroundColor: '#2c2c2e', border: '1px solid #555', color: '#fff', boxSizing: 'border-box' }} 
            {...register("email", {
              required: "이메일을 입력해 주세요.",
              pattern: { value: /@/, message: "올바른 이메일 형식이 아닙니다." }
            })}
          />
          {errors.email && <span style={{ display: 'block', color: '#ff3b3b', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>{errors.email.message}</span>}
        </div>

        {/* 비밀번호 영역: 정규식 적용 (영문+숫자 조합 8자 이상) */}
        <div style={{ position: 'relative' }}>
          <label style={{ display: 'block', textAlign: 'center', marginBottom: '8px', color: '#ccc', fontSize: '14px' }}>비밀번호</label>
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="8자 이상, 영문+숫자" 
            style={{ width: '100%', padding: '10px', backgroundColor: '#2c2c2e', border: '1px solid #555', color: '#fff', boxSizing: 'border-box' }} 
            {...register("password", {
              required: "비밀번호를 입력해 주세요.",
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/,
                message: "비밀번호는 8자 이상이며 영문과 숫자를 모두 포함해야 합니다."
              }
            })}
          />
          {/* type="button" 명시로 submit 방지 */}
          <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '10px', top: '35px', background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '12px' }}>
            {showPassword ? '숨기기' : '보기'}
          </button>
          {errors.password && <span style={{ display: 'block', color: '#ff3b3b', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>{errors.password.message}</span>}
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label style={{ display: 'block', textAlign: 'center', marginBottom: '8px', color: '#ccc', fontSize: '14px' }}>비밀번호 확인</label>
          <input 
            type="password" 
            placeholder="비밀번호 다시 입력" 
            style={{ width: '100%', padding: '10px', backgroundColor: '#2c2c2e', border: '1px solid #555', color: '#fff', boxSizing: 'border-box' }} 
            {...register("confirmPassword", {
              required: "비밀번호 확인을 입력해 주세요.",
              validate: (value) => value === watch('password') || "비밀번호가 일치하지 않습니다."
            })}
          />
          {errors.confirmPassword && <span style={{ display: 'block', color: '#ff3b3b', fontSize: '12px', textAlign: 'center', marginTop: '8px' }}>{errors.confirmPassword.message}</span>}
        </div>

        <button type="submit" style={{ backgroundColor: '#555', color: '#fff', border: 'none', padding: '12px', marginTop: '10px', cursor: 'pointer', fontWeight: 'bold' }}>가입하기</button>
      </form>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#777' }}>
        이미 계정이 있나요? <Link to="/login" style={{ color: '#a78bfa', textDecoration: 'none' }}>로그인</Link>
      </div>
    </div>
  );
}

export default Signup;