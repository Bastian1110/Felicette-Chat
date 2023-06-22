/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				text: '#00000f',
				background: '#f5f5ff',
				primary: '#514efd',
				'primary-obscure': '#514efd07',
				secondary: '#ffffff',
				accent: '#3835fd'
			}
		}
	},
	plugins: []
};
