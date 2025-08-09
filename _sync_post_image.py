import shutil
import os

# 获取当前脚本所在目录（也就是项目根目录）
root_dir = os.path.dirname(os.path.abspath(__file__))

# 用相对路径拼接
public_posts_path = os.path.join(root_dir, "public", "posts")
src_imgs_path = os.path.join(root_dir, "src", "content", "posts", "imgs")
target_imgs_path = os.path.join(public_posts_path, "imgs")

# 删除 public/posts 文件夹（包括符号链接）
if os.path.exists(public_posts_path):
    shutil.rmtree(public_posts_path)
    print(f"已删除: {public_posts_path}")

# 重新创建 public/posts
os.makedirs(public_posts_path, exist_ok=True)

# 复制 imgs 文件夹
shutil.copytree(src_imgs_path, target_imgs_path)
print(f"已复制: {src_imgs_path} -> {target_imgs_path}")
