import React from 'react'
import { useNavigate  } from "react-router-dom";
import { toast } from 'react-toastify'
import { useForm } from "react-hook-form";



function SignUp() {
    const navigate  = useNavigate ();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const createUser = (userAdd) => {
        console.log(userAdd)

        toast.success('Your account has been create successfully')
        document.getElementById('signUpForm').reset()
        navigate("/sign-in")


       
    }

    function myFunction() {
        let x = document.getElementById("password");
        if (x.type === "password") {
            x.type = "text";

        }
        else {
            x.type = "password";
        }

    }
    function registration(){
        navigate("/sign-up")
    
    }

    return (
        <section className="main-about-heading mt-5 ">
            <div className="text-center">
                <h1 className="display-6 fw-bold text-uppercase">sign up</h1>
                <hr className="w-25 mx-auto " />
            </div>
            <div className="container my-5">
                <div className="row">
                    <div className="col-xxl-8 col-10 col-md-8 mx-auto  ">
                        <form autoComplete="on" id="signUpForm" onSubmit={handleSubmit(createUser)}>
                            <div className="mb-3">
                                <label className="form-label" >Name</label>
                                <input type="text" className="form-control"  {...register("name", { required: true })}
                                    placeholder="enter your name" />
                                {errors.exampleRequired && <span>This field is required</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Father Name</label>
                                <input type="text" className="form-control"  {...register("fName", { required: true })}
                                    placeholder="enter father name" />
                                {errors.exampleRequired && <span>This field is required</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Gender</label>
                                <select className="form-select" aria-label="Default select example" {...register("gender")}>
                                    <option defaultValue>Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email address</label>
                                <input type="email" className="form-control"  {...register("email", { required: true })}
                                    placeholder="name@example.com" />
                                {errors.exampleRequired && <span>This field is required</span>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input id="password" type="password" className="form-control"  {...register("password", { required: true })}
                                    placeholder="password" />
                                <i id="visible-on" className="bi bi-eye-fill float-end h3 visibility" onClick={myFunction} ></i>
                                <i id="visible-ff" className="bi bi-eye-slash-fill float-end h3 visibility" onClick={myFunction} style={{ display: "none" }}></i>
                                {errors.exampleRequired && <span>This field is required</span>}
                            </div>
                            <div className="h5 ">
                                {/* <Link to='/'>Already have an account</Link> */}
                                <a style={{color:"blue" ,cursor:"pointer"}} onClick={registration}>Already have ands Account</a>

                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary ">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp