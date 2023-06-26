import { json } from '@sveltejs/kit';
import { getUser } from '$lib/server/db';
import { verify } from 'argon2';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';

import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { username, password } = await request.json();
		const userData = await getUser(username);
		if (!userData) {
			return json({ message: "User doesn't exists" }, { status: 400 });
		}
		if (await verify(userData.password, password)) {
			delete userData.password;
			const token = sign({ userData }, JWT_SECRET);
			return json({ message: 'Login successfull', token, userData }, { status: 200 });
		}
		return json({ message: 'Bad credentials' }, { status: 400 });
	} catch (err) {
		return json({ message: 'Bad request, missing form values' }, { status: 400 });
	}
};
