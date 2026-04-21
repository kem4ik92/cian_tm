import { NewListingForm } from "./NewListingForm";

export default function NewListingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold">Подать объявление</h1>
      <p className="text-slate-600 mt-1 mb-6">
        Заполните форму — объявление появится на сайте после модерации. Это
        прототип, данные сохраняются только в рамках текущей сессии браузера.
      </p>
      <NewListingForm />
    </div>
  );
}
