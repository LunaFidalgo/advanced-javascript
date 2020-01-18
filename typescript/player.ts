interface Player {
    play(): void;
    pause(): void;
    decode(): void;
}
abstract class Video implements Player {
    constructor(protected path: string) {}
    play() {
        this.decode();
        console.log('Play');
    }
    pause() {
        console.log('Pause');
    }

    abstract decode(): void;
}
class AVIVideo extends Video {
    decode(): void {
        console.log('AVI decoding');
    }
}
class MPGVideo extends Video {
    decode(): void {
        console.log('MPG decoding');
    }
}
class MP4Video extends Video {
    decode(): void {
        console.log('MP4 decoding');
    }
}
function factoryPlayer(path): Player {
    if (path.endsWith('mp4')) {
        return new MP4Video(path);
    } else if (path.endsWith('mpg')) {
        return new MPGVideo(path);
    } else if (path.endsWith('avi')) {
        return new AVIVideo(path);
    }
    throw new Error('Code not supported');
}
