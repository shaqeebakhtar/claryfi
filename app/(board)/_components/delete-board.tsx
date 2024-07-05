import DeleteBoardDialog from './delete-board-dialog';

const DeleteBoard = () => {
  return (
    <div className="rounded-lg border border-red-600 bg-background">
      <div className="flex flex-col space-y-2 p-5 sm:p-10">
        <h2 className="text-xl font-medium">Delete Board</h2>
        <p className="text-sm text-muted-foreground">
          Deleting your board will also delete all the feedbacks and others
          things associated with it. This action cannot be undone - please
          proceed with caution.
        </p>
      </div>
      <div className="border-b border-red-600" />
      <div className="flex items-center justify-end px-5 py-4 sm:px-10">
        <DeleteBoardDialog />
      </div>
    </div>
  );
};

export default DeleteBoard;
