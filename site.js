const SUPABASE_URL = 'https://seyjvxfxrxaanrtuvcoz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_-L-xk1i5gA0NigVphnBSKQ_42qxd3Zb';
const mySB = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const form = document.getElementById('feedbackForm');
form.addEventListener('submit', async(e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    const { data, error } = await mySB.from('feedback').insert([{ name, email }]);
    if (error) {
        alert('Ошибка при отправке данных: ' + error.message);
    } else {
        alert('Данные успешно отправлены!');
        form.reset();
    }
});

async function exportFromDB() {
    const { data, error } = await mySB
        .from('feedback')
        .select('*');
    if (error) {
        alert('Ошибка при получении данных: ' + error.message);
        return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Feedback');

    XLSX.writeFile(workbook, 'feedback_data.xlsx');

}

