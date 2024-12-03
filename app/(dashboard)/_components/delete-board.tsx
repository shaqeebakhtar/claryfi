import DeleteBoardDialog from './delete-board-dialog';

const DeleteBoard = () => {
  return (
    <div className="xl:space-x-3 pt-8">
      <div className="grid xl:grid-cols-4 space-y-0 gap-6 xl:gap-3 items-start">
        <div className="space-y-1 max-w-xs">
          <h2 className="text-base font-medium text-destructive">
            Delete Board
          </h2>
          <p className="text-sm text-muted-foreground">
            Deleting your board will also delete all the feedbacks and others
            things associated with it.
          </p>
        </div>
        <div className="col-span-2 flex flex-col gap-3 items-end">
          <DeleteBoardDialog />
        </div>
      </div>
    </div>
  );
};

export default DeleteBoard;
