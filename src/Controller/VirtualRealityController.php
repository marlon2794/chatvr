<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class VirtualRealityController extends AbstractController
{
    /**
     * @Route("/virtual-reality", name="virtual_reality")
     */
    public function virtualReality(): Response
    {
        return $this->render('virtual_reality/index.html.twig');
    }

    /**
     * @Route("/avatar", name="avatar")
     */
    public function avatar(): Response
    {
        return $this->render('virtual_reality/avatar.html.twig');
    }

    /**
     * @Route("/chatvr", name="chatvr")
     */
    public function chatVr(): Response
    {
        return $this->render('virtual_reality/chat-vr.html.twig');
    }

    /**
     * @Route("/spacevr", name="spacevr")
     */
    public function spaceVr(): Response
    {
        return $this->render('virtual_reality/space-vr.html.twig');
    }

    /**
     * @Route("/environmentvr", name="environmentvr")
     */
    public function environmentVr(): Response
    {
        return $this->render('virtual_reality/environment-vr.html.twig');
    }

    /**
     * @Route("/sendmssg", name="send_message", methods={"POST"})
     */
    public function sendMessage(): Response
    {
        $message = $_POST["message"];
        return $this->render('virtual_reality/prueba.html.twig', [
            'message' => $message,
        ]);
    }

    /**
     * @Route("/indexvr", name="indexvr")
     */
    public function indexVr(): Response
    {
        return $this->render('virtual_reality/index-vr.html.twig');
    }

    /**
     * @Route("/keyboardvr", name="keyboardvr")
     */
    public function keyboardVr(): Response
    {
        return $this->render('virtual_reality/keyboard-vr.html.twig');
    }

    /**
     * @Route("/guivr", name="guivr")
     */
    public function guivr(): Response
    {
        return $this->render('virtual_reality/gui.html.twig');
    }


    /**
     * @Route("/chatvrgui", name="chatvrgui")
     */
    public function chatVrGui(): Response
    {
        return $this->render('virtual_reality/chat-vr-gui.html.twig');
    }

    /**
     * @Route("/xx", name="xx")
     */
    public function xx(): Response
    {
        return $this->render('virtual_reality/xx.html.twig');
    }


    /**
     * @Route("/prueba", name="prueba")
     */
    public function prueba(): Response
    {
        return $this->render('virtual_reality/prueba.html.twig');
    }
}
