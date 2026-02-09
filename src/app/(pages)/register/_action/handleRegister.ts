export async function handleRegisterAction(values:{	name: string,
			email:string,
			password: string,
			rePassword: string,
			phone: string,}){
    		const response = await fetch(
			"https://ecommerce.routemisr.com/api/v1/auth/signup",
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(values),
			},
		);

		const data = await response.json();
        return data
}