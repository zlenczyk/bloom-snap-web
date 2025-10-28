import { BookOpenText } from "lucide-react";

const Description = () => {
  return (
    <section
      id="description"
      className="bg-white rounded-xl p-6 shadow-md border border-gray-100 col-span-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-amber-100">
          <BookOpenText className="h-5 w-5 text-amber-700" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Description</h2>
      </div>
      <p className="text-base text-gray-700 leading-relaxed">
        The Fiddle Leaf Fig (Ficus lyrata) is a popular indoor plant known for
        its large, violin-shaped leaves. Native to western Africa, it thrives in
        warm, humid conditions with bright, indirect light. It's a stunning
        statement plant that can grow quite tall, adding dramatic flair to any
        room. The Fiddle Leaf Fig (Ficus lyrata) is a popular indoor plant known
        for its large, violin-shaped leaves. Native to western Africa, it
        thrives in warm, humid conditions with bright, indirect light. It's a
        stunning statement plant that can grow quite tall, adding dramatic flair
        to any room.
      </p>
    </section>
  );
};

export default Description;
