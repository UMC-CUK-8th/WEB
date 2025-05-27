const LpTags = ({ tags }: { tags: any[] }) => (
    <div className="flex flex-wrap justify-center gap-2 mb-4">
      {tags.map(tag => (
        <span
          key={tag.id}
          className="px-3 py-1 text-sm bg-gray-700 rounded-full text-white"
        >
          #{tag.name}
        </span>
      ))}
    </div>
  );
  
  export default LpTags;
  