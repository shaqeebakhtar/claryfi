import BoardName from '@/app/(board)/_components/board-name';
import BoardSlug from '@/app/(board)/_components/board-slug';
import DeleteBoard from '@/app/(board)/_components/delete-board';
import UploadLogo from '@/app/(board)/_components/upload-logo';

const AdminSettings = () => {
  return (
    <>
      <BoardName />
      <BoardSlug />
      <UploadLogo />
      <DeleteBoard />
    </>
  );
};

export default AdminSettings;
